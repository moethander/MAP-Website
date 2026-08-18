const OurStory = ({ homeData }) => {
  return (
    <section
      id="our-story"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
            {homeData.storyTitle}
          </h2>

          <p className="text-gray-600 text-lg leading-9 whitespace-pre-line text-center">
            {homeData.storyDescription}
          </p>

        </div>

      </div>
    </section>
  );
};

export default OurStory;