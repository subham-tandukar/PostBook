import BlogCard from "./BlogCard";
import Loading from "./loading";

const Profile = ({ name, desc, data, handleEdit, handleDelete, loading }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      {loading ? (
        <div className="mt-20">
          <Loading />
        </div>
      ) : (
        <>
          <div className="mt-10 prompt_layout">
            {data.map((post) => (
              <BlogCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
