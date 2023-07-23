import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
        consequuntur praesentium maiores ad eius ipsa reiciendis soluta eligendi
        deleniti in. Doloremque necessitatibus sit quia quidem magni debitis
        assumenda dignissimos molestiae?
      </p>

      {/* Feed */}
      <Feed/>
    </section>
  );
};

export default Home;
