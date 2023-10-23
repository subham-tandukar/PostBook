import Nav from "@components/Nav";
import Provider from "@components/Provider";
import Toast from "@components/Toast";
import "@styles/globals.css";

export const metadata = {
  title: "Post Book",
  description: "Let's Post Here",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            <Toast />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
