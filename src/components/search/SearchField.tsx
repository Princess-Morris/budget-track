import "./search-field.css"

interface searchProps {
    searchInput: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchField({ searchInput, handleSearchChange }: searchProps) {
    return (
        <input
        className="input-search"
        type="text"
        name="search"
        placeholder="Search with description..."
        value={searchInput}
        onChange={handleSearchChange}
    />
    )
}