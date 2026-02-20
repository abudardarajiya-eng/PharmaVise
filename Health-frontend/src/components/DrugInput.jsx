export default function DrugInput({ drugs, setDrugs }) {
  return (
    <input
      type="text"
      placeholder="Enter drug(s) e.g. CODEINE, WARFARIN"
      value={drugs}
      onChange={(e) => setDrugs(e.target.value.toUpperCase())}
      className="w-full border p-3 rounded-lg mt-4"
    />
  );
}