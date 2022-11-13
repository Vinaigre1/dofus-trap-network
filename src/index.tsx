import App from "@components/App";
import { createRoot } from "react-dom/client";
import "@src/i18n";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
