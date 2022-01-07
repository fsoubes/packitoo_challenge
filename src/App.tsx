import BriefList from "./features/briefs/components/BriefList";
import BriefForm from "./features/form/components/BriefForm";
import "./main.scss";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <BriefForm />
      <BriefList />
    </div>
  );
}

export default App;
