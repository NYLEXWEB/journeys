with open('src/components/CuratedExperiences.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace header button link:
old_header = '''          <Link
            href={`/experiences#${exp.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E9E0D2] bg-white/80 hover:bg-[#183D2B] text-[#183D2B] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm self-start sm:self-auto"
          >'''

new_header = '''          <Link
            href="/experiences"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E9E0D2] bg-white/80 hover:bg-[#183D2B] text-[#183D2B] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm self-start sm:self-auto"
          >'''

text = text.replace(old_header, new_header)

with open('src/components/CuratedExperiences.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated CuratedExperiences header successfully")
