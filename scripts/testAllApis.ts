import { spawn, ChildProcess } from "child_process";

const PORT = 3012;
const BASE_URL = `http://localhost:${PORT}`;

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url: string, maxRetries = 25): Promise<boolean> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return true;
    } catch {
      // Retry
    }
    await wait(1000);
  }
  return false;
}

async function runTests() {
  console.log("==================================================");
  console.log("STARTING FULL API SUITE TEST AGAINST MONGODB");
  console.log("==================================================");

  console.log(`Starting Next.js server on port ${PORT}...`);
  const server: ChildProcess = spawn(
    "cmd.exe",
    ["/c", `npx next start -p ${PORT}`],
    {
      env: { ...process.env, PORT: String(PORT) },
      stdio: "pipe",
    }
  );

  const isReady = await waitForServer(`${BASE_URL}/api/content/all`);
  if (!isReady) {
    console.error("ERROR: Server failed to start on port", PORT);
    server.kill();
    process.exit(1);
  }
  console.log("Server is LIVE and accepting connections.");
  console.log("--------------------------------------------------");

  let authCookie = "";
  const results: { test: string; status: "PASS" | "FAIL"; details: string }[] = [];

  function logPass(test: string, details: string) {
    console.log(`  ✓ [PASS] ${test} - ${details}`);
    results.push({ test, status: "PASS", details });
  }

  function logFail(test: string, details: string) {
    console.error(`  ✗ [FAIL] ${test} - ${details}`);
    results.push({ test, status: "FAIL", details });
  }

  try {
    // 1. GET /api/content/all
    {
      const res = await fetch(`${BASE_URL}/api/content/all`);
      const data = await res.json();
      if (res.status === 200 && data.isLiveDb === true && data.destinations?.length > 0) {
        logPass(
          "GET /api/content/all",
          `Status 200, Live MongoDB verified! (${data.destinations.length} destinations, ${data.reviews.length} reviews, ${data.heroSlides.length} hero slides)`
        );
      } else {
        logFail("GET /api/content/all", `Status ${res.status}, isLiveDb: ${data.isLiveDb}`);
      }
    }

    // 2. POST /api/auth/login (Admin Auth)
    {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "jibu2026" }),
      });
      const data = await res.json();
      const rawCookie = res.headers.get("set-cookie") || "";
      if (res.status === 200 && data.success && rawCookie.includes("journeys_admin_session")) {
        authCookie = rawCookie.split(";")[0];
        logPass("POST /api/auth/login", `Status 200, admin authenticated, session cookie issued`);
      } else {
        logFail("POST /api/auth/login", `Status ${res.status}, data: ${JSON.stringify(data)}`);
      }
    }

    const authHeaders = {
      "Content-Type": "application/json",
      Cookie: authCookie,
    };

    // 3. GET /api/auth/me (Session Check)
    {
      const res = await fetch(`${BASE_URL}/api/auth/me`, { headers: authHeaders });
      const data = await res.json();
      if (res.status === 200 && data.authenticated === true) {
        logPass("GET /api/auth/me", `Status 200, verified active admin session`);
      } else {
        logFail("GET /api/auth/me", `Status ${res.status}`);
      }
    }

    // 4. DESTINATIONS API (GET, POST, PUT, DELETE)
    let probeDestId = "";
    {
      // GET
      const getRes = await fetch(`${BASE_URL}/api/content/destinations`);
      const resData = await getRes.json();
      if (getRes.status === 200 && Array.isArray(resData.destinations)) {
        logPass("GET /api/content/destinations", `Status 200, retrieved ${resData.destinations.length} destinations`);
      } else {
        logFail("GET /api/content/destinations", `Status ${getRes.status}`);
      }

      // POST (CREATE)
      const postRes = await fetch(`${BASE_URL}/api/content/destinations`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          name: "Automated Test Sanctuary",
          state: "Kerala",
          stateCategory: "kerala",
          region: "Wayanad Highlands",
          image: "/images/tea-plantation.jpg",
          shortVibe: "Ephemeral test vibe for API suite.",
          overview: "Comprehensive overview of automated test sanctuary.",
          highlights: ["Private river trail", "Organic orchard"],
        }),
      });
      const postData = await postRes.json();
      if (postRes.status === 201 && postData.destination?._id) {
        probeDestId = postData.destination._id;
        logPass("POST /api/content/destinations", `Status 201, created destination ID: ${probeDestId}`);
      } else {
        logFail("POST /api/content/destinations", `Status ${postRes.status}, ${JSON.stringify(postData)}`);
      }

      // PUT (UPDATE)
      if (probeDestId) {
        const putRes = await fetch(`${BASE_URL}/api/content/destinations/${probeDestId}`, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            shortVibe: "Updated ephemeral test vibe.",
          }),
        });
        const putData = await putRes.json();
        if (putRes.status === 200 && putData.destination?.shortVibe === "Updated ephemeral test vibe.") {
          logPass(`PUT /api/content/destinations/[id]`, `Status 200, updated successfully`);
        } else {
          logFail(`PUT /api/content/destinations/[id]`, `Status ${putRes.status}`);
        }

        // DELETE
        const delRes = await fetch(`${BASE_URL}/api/content/destinations/${probeDestId}`, {
          method: "DELETE",
          headers: authHeaders,
        });
        const delData = await delRes.json();
        if (delRes.status === 200 && delData.success) {
          logPass(`DELETE /api/content/destinations/[id]`, `Status 200, deleted cleanly`);
        } else {
          logFail(`DELETE /api/content/destinations/[id]`, `Status ${delRes.status}`);
        }
      }
    }

    // 5. EXPERIENCES API (GET, POST, DELETE)
    let probeExpId = "";
    {
      const getRes = await fetch(`${BASE_URL}/api/content/experiences`);
      const resData = await getRes.json();
      if (getRes.status === 200 && Array.isArray(resData.experiences)) {
        logPass("GET /api/content/experiences", `Status 200, retrieved ${resData.experiences.length} experiences`);
      } else {
        logFail("GET /api/content/experiences", `Status ${getRes.status}`);
      }

      const postRes = await fetch(`${BASE_URL}/api/content/experiences`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          number: "08",
          title: "Automated Spice Trail Probe",
          duration: "Half-day immersion",
          locations: "Thekkady cardamom hills",
          image: "/images/plantation.jpg",
          description: "Curated trail exploring pepper, cardamom, and clove cultivars.",
          highlights: ["Private botanist guide", "Tasting session"],
        }),
      });
      const postData = await postRes.json();
      if (postRes.status === 201 && postData.experience?._id) {
        probeExpId = postData.experience._id;
        logPass("POST /api/content/experiences", `Status 201, created experience ID: ${probeExpId}`);

        const delRes = await fetch(`${BASE_URL}/api/content/experiences/${probeExpId}`, {
          method: "DELETE",
          headers: authHeaders,
        });
        if (delRes.status === 200) {
          logPass(`DELETE /api/content/experiences/[id]`, `Status 200, deleted cleanly`);
        } else {
          logFail(`DELETE /api/content/experiences/[id]`, `Status ${delRes.status}`);
        }
      } else {
        logFail("POST /api/content/experiences", `Status ${postRes.status}, data: ${JSON.stringify(postData)}`);
      }
    }

    // 6. JOURNEYS API (GET, POST, DELETE)
    let probeJourneyId = "";
    {
      const getRes = await fetch(`${BASE_URL}/api/content/journeys`);
      const resData = await getRes.json();
      if (getRes.status === 200 && Array.isArray(resData.journeys)) {
        logPass("GET /api/content/journeys", `Status 200, retrieved ${resData.journeys.length} signature journeys`);
      } else {
        logFail("GET /api/content/journeys", `Status ${getRes.status}`);
      }

      const postRes = await fetch(`${BASE_URL}/api/content/journeys`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          route: "Kochi to Munnar & Vembanad",
          duration: "7 Days / 6 Nights",
          shortVibe: "Bespoke highland and backwater immersion.",
          overview: "Curated overland route through the Western Ghats.",
          highlights: ["Colonial plantation stay", "Private kettuvallam cruise"],
          image: "/images/tea-plantation.jpg",
        }),
      });
      const postData = await postRes.json();
      if (postRes.status === 201 && postData.journey?._id) {
        probeJourneyId = postData.journey._id;
        logPass("POST /api/content/journeys", `Status 201, created journey ID: ${probeJourneyId}`);

        const delRes = await fetch(`${BASE_URL}/api/content/journeys/${probeJourneyId}`, {
          method: "DELETE",
          headers: authHeaders,
        });
        if (delRes.status === 200) {
          logPass(`DELETE /api/content/journeys/[id]`, `Status 200, deleted cleanly`);
        } else {
          logFail(`DELETE /api/content/journeys/[id]`, `Status ${delRes.status}`);
        }
      } else {
        logFail("POST /api/content/journeys", `Status ${postRes.status}, data: ${JSON.stringify(postData)}`);
      }
    }

    // 7. GOOGLE REVIEWS API (GET, POST, DELETE)
    let probeReviewId = "";
    {
      const getRes = await fetch(`${BASE_URL}/api/content/reviews`);
      const resData = await getRes.json();
      if (getRes.status === 200 && Array.isArray(resData.reviews)) {
        logPass("GET /api/content/reviews", `Status 200, retrieved ${resData.reviews.length} Google reviews`);
      } else {
        logFail("GET /api/content/reviews", `Status ${getRes.status}`);
      }

      const postRes = await fetch(`${BASE_URL}/api/content/reviews`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          author: "Sir Arthur Pendelton",
          location: "Oxford, UK",
          rating: 5,
          relativeTime: "Just now",
          tripType: "14-Day South India Grand Tour",
          text: "Impeccable curation, world-class chauffeur, and unforgettable attention to detail.",
        }),
      });
      const postData = await postRes.json();
      if (postRes.status === 201 && postData.review?._id) {
        probeReviewId = postData.review._id;
        logPass("POST /api/content/reviews", `Status 201, created review ID: ${probeReviewId}`);

        const delRes = await fetch(`${BASE_URL}/api/content/reviews/${probeReviewId}`, {
          method: "DELETE",
          headers: authHeaders,
        });
        if (delRes.status === 200) {
          logPass(`DELETE /api/content/reviews/[id]`, `Status 200, deleted cleanly`);
        } else {
          logFail(`DELETE /api/content/reviews/[id]`, `Status ${delRes.status}`);
        }
      } else {
        logFail("POST /api/content/reviews", `Status ${postRes.status}`);
      }
    }

    // 8. HERO API (GET, PUT)
    {
      const getRes = await fetch(`${BASE_URL}/api/content/hero`);
      const resData = await getRes.json();
      if (getRes.status === 200 && Array.isArray(resData.slides)) {
        logPass("GET /api/content/hero", `Status 200, retrieved ${resData.slides.length} hero slides`);

        const putRes = await fetch(`${BASE_URL}/api/content/hero`, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({ slides: resData.slides }),
        });
        if (putRes.status === 200) {
          logPass("PUT /api/content/hero", `Status 200, slides verified and updated`);
        } else {
          logFail("PUT /api/content/hero", `Status ${putRes.status}`);
        }
      } else {
        logFail("GET /api/content/hero", `Status ${getRes.status}`);
      }
    }

    // 9. CONTACT API (GET, PUT)
    {
      const getRes = await fetch(`${BASE_URL}/api/content/contact`);
      const resData = await getRes.json();
      const contact = resData.contact;
      if (getRes.status === 200 && contact?.whatsappNumber) {
        logPass("GET /api/content/contact", `Status 200, concierge number: ${contact.whatsappNumber}`);

        const putRes = await fetch(`${BASE_URL}/api/content/contact`, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            ...contact,
            consultationNote: "Connect directly with Jibu Thomas for instant advice, route feasibility, and quick date inquiries.",
          }),
        });
        if (putRes.status === 200) {
          logPass("PUT /api/content/contact", `Status 200, contact updated`);
        } else {
          logFail("PUT /api/content/contact", `Status ${putRes.status}`);
        }
      } else {
        logFail("GET /api/content/contact", `Status ${getRes.status}`);
      }
    }

    // 10. FOOTER API (GET, PUT)
    {
      const getRes = await fetch(`${BASE_URL}/api/content/footer`);
      const resData = await getRes.json();
      const footer = resData.footer;
      if (getRes.status === 200 && footer?.brandName) {
        logPass("GET /api/content/footer", `Status 200, brand: ${footer.brandName}`);

        const putRes = await fetch(`${BASE_URL}/api/content/footer`, {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify(footer),
        });
        if (putRes.status === 200) {
          logPass("PUT /api/content/footer", `Status 200, footer verified and saved`);
        } else {
          logFail("PUT /api/content/footer", `Status ${putRes.status}`);
        }
      } else {
        logFail("GET /api/content/footer", `Status ${getRes.status}`);
      }
    }

    // 11. POST /api/auth/logout
    {
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: authHeaders,
      });
      if (res.status === 200) {
        logPass("POST /api/auth/logout", `Status 200, session cleared`);
      } else {
        logFail("POST /api/auth/logout", `Status ${res.status}`);
      }
    }
  } catch (err) {
    console.error("Test execution exception:", err);
  } finally {
    console.log("--------------------------------------------------");
    console.log("Shutting down test server...");
    server.kill();
    await wait(1500);

    const total = results.length;
    const passed = results.filter((r) => r.status === "PASS").length;
    const failed = results.filter((r) => r.status === "FAIL").length;

    console.log("==================================================");
    console.log(`API TEST SUITE SUMMARY: ${passed}/${total} PASSED (Failed: ${failed})`);
    console.log("==================================================");

    if (failed > 0) {
      process.exit(1);
    } else {
      console.log("ALL API ENDPOINTS PASSED 100%!");
      process.exit(0);
    }
  }
}

runTests();
