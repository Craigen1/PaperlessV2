import "./App.css";
import { ITopProvider } from "./hooks/TopContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AppIndex from "./components/AppIndex";
export default function App() {
  // console.log("asd");
  return (
    <ITopProvider>
      <AppIndex />
    </ITopProvider>
  );
}
