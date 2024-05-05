import { useState } from 'react'

function useSearchHook() {
    const [search, setSearch] = useState<string>();
    return [search, setSearch]
}

export { useSearchHook };