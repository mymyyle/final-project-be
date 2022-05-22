const Job = require("./models/Job");

const jobTitle = [
  //   "Spokes for All Folks",
  //   "The Pavement Project",
  //   "Wheels of Change",
  //   "Backpack Heros",
  //   "Kits for Kids",
  //   "The Full Tummies Project",
  //   "The Little Library ",
  "Children of the Future",
  "The Next Stage Theater",
  "Learning League",
  "Mind Masters Math Club",
  "Helping Hands and Tomatoes",
  "The Be Kind Diner",
  "Project Can-Do",
  "Second Helping",
  "The Community Dish Network",
  "Dishing Up Home",
  "The Belly Laugh Project",
  "Soup for the Soul ",
  "Bread and Bounty",
  "The Spoon Stewards",
  "Wide Space and Open Hearts Club",
  "Conservation Station",
  "Grass and Roots",
  "The Open Spaces Project",
  "Let the Sunshine In",
  "The Spring Cleaning Project",
  "Tiny Trail Blazers",
  "Trash Taskforce ",
  "Happy Tails on Trails",
  "Furever Friends",
  "A Pawsitive Light",
  "Spay-ghetti Dinner",
  "Hearts 4 Paws",
  "Give Back Summer",
  "March for a Cause",
  "Summer of Volunteering",
  "Spring Forward ",
  "Spring Into Action",
  "School’s Out Academy",
  "Vol-tober ",
  "Project Forever Thankful",
  "The Season of Giving Project",
  "Festival of Trees ",
  "The Gift of Play Toy Drive",
  "The Purlin’ Girls ",
  "Project Tight Knit",
  "Project Pen Pal",
  "Two’s Company",
  "Tea for Two",
  "Community Bridge: Cards and Friends",
  "Bridging Gaps ",
  "The Best Friend Initiative",
  "AI Alliance",
  "Code for Good",
  "Nerd Herd",
  "Coding Camp",
  //   "Future Fellowship",
  //   "Her Science Lab",
  //   "Science Sisterhood",
];
const AUTHOR_ID = [
  "62780457ee65e92c56eaaf01",
  "6279e8af6bf0c20f6109c340",
  "6279eb5f0ba371420e6b0748",
  "627e96fd8f82de204333a22e",
  "62872fb878a571a49ed091f7",
  "62872efcf58a693a31be9d4e",
  "6282b4d337e8fe11f954085a",
];
const TYPE = ["Full time", "Part time", "Temporary"];
const CATEGORY = ["Community", "Environment", "Healthcare"];

const createJob = async (numberOfJob) => {
  for (let i = 0; i < numberOfJob; i++) {
    const random = Math.ceil(Math.random() * 100000);
    const lng = Number("106.6" + random);
    const lat = Number("10.1 " + random);
    const authorNumber = Math.ceil(Math.random() * 6 - 1);
    const randomTG = Math.ceil(Math.random() * 3 - 1);
    const singleJob = {
      authorId: AUTHOR_ID[authorNumber],
      name: jobTitle[i],
      type: TYPE[randomTG],
      category: CATEGORY[randomTG],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam dolorem soluta officiis repellendus consectetur facilis qui nisi obcaecati eius sequi voluptatem porro quos quis odio corporis reprehenderit reiciendis, rem distinctio fugit nemo vero enim. Sequi fuga unde laboriosam perferendis asperiores recusandae sed reiciendis natus, saepe, odit magni pariatur! Aperiam vero nulla sint voluptas explicabo reiciendis recusandae qui? Vitae commodi laudantium obcaecati quas ducimus excepturi eos et suscipit voluptas sapiente deserunt quos odio a culpa, porro totam, voluptates hic officiis numquam cupiditate blanditiis aut laboriosam doloremque! Vel fuga nihil recusandae assumenda, accusamus mollitia ab vitae voluptatem voluptas cum non sed qui natus, asperiores aperiam! Itaque laborum velit cumque soluta, in, reiciendis a quas laboriosam eos perferendis temporibus vitae, aperiam nulla. Ipsum, earum odit, eius alias repellendus sunt cupiditate corporis, harum explicabo consequuntur odio fugit iure sequi nam? Explicabo ut possimus assumenda similique obcaecati quidem ipsum itaque dolores in minima aliquam, tempora deserunt recusandae fuga rem? Praesentium pariatur commodi quidem optio! Debitis cupiditate ipsam dolorum fugit quasi maxime perferendis temporibus animi reprehenderit! Repudiandae fuga sint beatae non esse. Optio cum perferendis fugiat quos unde? Maxime fugiat, possimus officiis accusantium nemo illum autem delectus sunt perspiciatis aliquid quis dignissimos! Non cum eos eaque voluptatibus quidem nesciunt consequatur magni ut ipsum asperiores, excepturi id quas odio ratione beatae",
      location: "Hồ Chí Minh",
      imageUrl:
        "https://res.cloudinary.com/dhwrzlrbm/image/upload/v1653027649/xu37spdzqiypbs2bjndj.jpg",
      detailedInformation: "",
      isDeleted: false,
      isFeatured: "false",
      status: "ongoing",
      lng,
      lat,
      district: "Quận 1",
      createdAt: "2022-05-20T06:20:49.063Z",

      updatedAt: "2022-05-20T06:20:49.063Z",
    };
    // console.log(`singleJob`, singleJob);
    // const found = await Job.findOne({ _id: singleJob.email });
    // console.log("Creating job");
    // if (!found) {
    const result = await Job.create(singleJob);
    console.log("===============");
    console.log(`create ${result.name} success`);
    // }
  }
};
module.exports = createJob;
