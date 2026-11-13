with open('src/components/Destinations.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace <div onClick={() => setSelectedDest(dest)} with <Link href={`/destinations#${dest.id}`}
target_card = '''  const renderDestinationCard = (
    dest: DestinationItem,
    indexKey: string,
    isGrid: boolean = false
  ) => (
    <div
      key={indexKey}
      onClick={() => setSelectedDest(dest)}
      className={`group relative ${'''

replacement_card = '''  const renderDestinationCard = (
    dest: DestinationItem,
    indexKey: string,
    isGrid: boolean = false
  ) => (
    <Link
      key={indexKey}
      href={`/destinations#${dest.id}`}
      className={`group relative ${'''

if target_card in code:
    code = code.replace(target_card, replacement_card, 1)
    # Also change closing tag from </div>); to </Link>);
    code = code.replace(
        '''        <div className="pt-1">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#E9E0D2] group-hover:text-white transition-colors duration-300">
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </div>
  );''',
        '''        <div className="pt-1">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#E9E0D2] group-hover:text-white transition-colors duration-300">
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );'''
    )

# Add Explore Full Destination Directory button right after </AnimatePresence>
target_after_carousel = '''      </AnimatePresence>

      {/* Modal: Destination Details'''

replacement_after_carousel = '''      </AnimatePresence>

      {/* Explore Full Directory CTA Button */}
      <div className="mt-12 sm:mt-16 text-center px-4 relative z-10">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#183D2B] hover:bg-[#8B5E35] text-[#FFFCF5] text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <span>View the Full Destinations Directory</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Modal: Destination Details'''

if target_after_carousel in code:
    code = code.replace(target_after_carousel, replacement_after_carousel, 1)

with open('src/components/Destinations.tsx', 'w', encoding='utf-8', newline='') as f:
    f.write(code)

print('Updated Destinations.tsx successfully!')

