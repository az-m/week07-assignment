import SearchForm from "../components/SearchForm";

export default function DeletePage() {
  const mode = "delete";
  return (
    <>
      <SearchForm mode={mode} />
    </>
  );
}
