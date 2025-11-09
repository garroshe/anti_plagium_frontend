import { Footer } from "../components/Footer/Footer.tsx";
import { Header } from "../components/Header/Header.tsx";
import { MainSection } from "../components/MainSection/MainSection.tsx";

export const MainPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Header />
        <MainSection />
        <Footer />
      </div>
    </div>
  );
};
