import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Container, Row, Col, Card } from "react-bootstrap";
import { FaSmile } from "react-icons/fa";
import staticColumnBg from "./assets/big-ben.jpg";
import headerBg from "./assets/union-jack3.jpg";
import scrollColumnBg from "./assets/reddish.png";
import unionJack from "./assets/union-jack-transparent.png";
import stampLogo from "./assets/stamp.png";

const defaultImage = "picsum.photos/200";
// colors for ratings
const colors = {
  blue: "blue",
  grey: "a9a9a9",
};
// for ratings
const stars = Array(5).fill(0);

// to print cards
function Stamp({ stamps }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: `center`,
        textAlign: `center`,
      }}
    >
      {stamps.map((stamp, index) => (
        <Card
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={index}
          style={{
            borderColor: `blue`,
            borderWidth: `2px`,
            borderRadius: `15px`,
            width: "16rem",
            // height: `100%`,
            padding: "1rem",
            backgroundImage: `url(${staticColumnBg})`,
          }}
        >
          <Card.Title style={{ fontSize: `2rem` }}>{stamp.title}</Card.Title>
          <Card.Img
            variant="top"
            src={"https://" + stamp.image}
            style={
              index === 0
                ? {
                    height: "300px",
                    objectFit: "contain",
                    transition: "transform .3s ease",
                  }
                : {
                    height: "150px",
                    objectFit: "contain",
                    transition: "transform .3s ease",
                  }
            }
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.2)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <Card.Body>
            <Card.Subtitle
              style={{ textDecoration: `underline`, fontSize: `1.2rem` }}
            >
              Country: {stamp.country}
            </Card.Subtitle>
            {index !== 0 ? <Card.Text>{stamp.description}</Card.Text> : ""}
            {stars.map((_, index) => {
              return (
                <FaSmile
                  key={index}
                  size={30}
                  style={{ paddingRight: `0.25rem` }}
                  color={
                    stamp.rating.split("/")[0] > index
                      ? colors.blue
                      : colors.grey
                  }
                />
              );
            })}
            <span style={{ fontSize: `0.75rem` }}>({stamp.rating} Stars)</span>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

function GenericDropdown({ options, value, onChange, className = "", id }) {
  return (
    <select
      value={value}
      id={id}
      className={className}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function App() {
  // initialise current stamps collection
  const [allStamps, setAllStamps] = useState([
    {
      title: "Penny Red",
      image:
        "i.guim.co.uk/img/media/2cc141155676166cf43006fe6918827b045c6c6a/0_0_1028_1177/master/1028.jpg?width=380&dpr=2&s=none&crop=none",
      country: "UK",
      rating: "3/5",
      description: `The Penny Red was a famous British postage stamp issued in 1841 to replace the world's first adhesive stamp, the Penny Black.`,
    },
    {
      title: "Inverted Jenny",
      image:
        "www.postalmuseum.org/wp-content/uploads/2023/04/inverted-jenny.jpg",
      country: "USA",
      rating: "4/5",
      description: `The Inverted Jenny is a rare 24-cent U.S. postage stamp issued on May 10, 1918, featuring an accidental printing error where the blue Curtiss JN-4 biplane ("Jenny") in the center is upside down.`,
    },
    {
      title: "1938 Koala",
      image:
        "i.guim.co.uk/img/media/90c1dd3fdb8abef5193804d2f8b0de55c64f3ca2/0_0_590_700/master/590.png?width=445&dpr=1&s=none&crop=none",
      country: "Australia",
      rating: "5/5",
      description: `The 1938 Australia Koala stamp is an iconic 4d (fourpence) pre-decimal postage stamp featuring a native koala hugging a tree branch.`,
    },
    {
      title: "Malay States",
      image:
        "www.paulfrasercollectibles.com/cdn/shop/files/RS3359_500x.jpg?v=1716542406",
      country: "Malaysia",
      rating: "5/5",
      description: `Federated Malay States (FMS) postage stamps were issued between 1900 and 1934 for a federation of four protected states under British rule: Perak, Selangor, Negri Sembilan, and Pahang.`,
    },
    {
      title: "One Penny",
      image: "www.cherrystoneauctions.com/scans_cache/201908_1770_200_180.jpg",
      country: "UK",
      rating: "4/5",
      description: `The value of a UK one-penny stamp depends entirely on its type, age, and condition, ranging from just a few pence for common Victorian issues to hundreds of thousands of pounds for rare plates.`,
    },
  ]);
  // initialise other states
  const [stamps, setStamps] = useState(allStamps);
  const [stampName, setStampName] = useState("");
  const [stampImage, setStampImage] = useState("");
  const [stampDescription, setStampDescription] = useState("");
  const [country, setCountry] = useState("UK");
  const [filteredStampNum, setFilteredStampNum] = useState(allStamps.length);
  const [rating, setRating] = useState("1/5");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  // validate stamp's name field
  function validate() {
    const newErrors = {};
    if (!stampName.trim()) newErrors.stampName = "Stamp's name is required";

    return newErrors;
  }

  // filter stamp via buttons
  function filterStamp(flag, stampsArray = allStamps) {
    setCurrentFilter(flag);
    if (flag === "all") {
      setStamps(stampsArray);
      setFilteredStampNum(stampsArray.length);
    } else {
      const filtered = stampsArray.filter(
        (s) => s.country.toLowerCase() === flag.toLowerCase(),
      );
      setStamps(filtered);
      setFilteredStampNum(filtered.length);
    }
  }

  // add new stamps
  function addStamp(e) {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setValidated(true); // mark form as validated so CSS triggers
      return; // stop submission
    }

    // If no errors, proceed normally
    setErrors({});
    setValidated(false);

    if (!stampName.trim()) {
      alert("Please fill in stamp name!");
      return;
    }

    // to use given stamp's image URL or use default from picsum
    const imageToUse = stampImage.trim() === "" ? defaultImage : stampImage;
    const newStamp = {
      title: stampName,
      image: imageToUse,
      country,
      rating,
      description: stampDescription,
    };

    // update allStamps states with the new stamp info
    const updatedAll = [...allStamps, newStamp];
    setAllStamps(updatedAll);

    // Update stamps and counts based on current filter and new allStamps
    filterStamp(currentFilter, updatedAll);

    // Reset inputs
    setStampName("");
    setStampImage("");
    setCountry("UK");
    setRating("1/5");
    setStampDescription("");
  }

  const countryOptions = ["UK", "Malaysia", "USA", "Australia"];
  const ratingOptions = ["1/5", "2/5", "3/5", "4/5", "5/5"];

  return (
    <>
      <Container>
        <Row>
          {/* SCROLLABLE COLUMN */}
          <Col
            md={9}
            xs={12}
            className="pb-4"
            style={{ backgroundImage: `url(${scrollColumnBg})` }}
          >
            <div
              className="sticky-top border border-5"
              style={{
                WebkitTextStroke: `1px black`,
                borderRadius: `1rem`,
                paddingTop: `1rem`,
                height: "12rem",
                backgroundImage: `url(${headerBg})`,
                color: `red`,
                fontWeight: `4000`,
                marginBottom: `1rem`,
                display: `flex`,
                justifyContent: `space-between`, // push left and right apart
                alignItems: `center`,
              }}
            >
              {/* Left side: logo + StampsCo stacked vertically, aligned left */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "0.25rem",
                }}
              >
                <Image src={stampLogo} width={100} alt="Company Logo" fluid />
                <span
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    // fontSize: "1.25rem",
                    paddingLeft: `1rem`,
                  }}
                >
                  StampsCo
                </span>
              </div>

              {/* Right side: heading text right aligned */}
              <h3
                style={{
                  margin: 0,
                  textAlign: "right",
                  paddingRight: `2rem`,
                  flex: 1,
                }}
              >
                Treasured Stamps of the British Empire
              </h3>
            </div>
            <div style={{ height: "auto" }}>
              <Stamp stamps={stamps} />

              <form
                noValidate
                onSubmit={addStamp}
                className="mt-5 border p-5 bg-secondary rounded"
              >
                <h2>Add Another Stamp</h2>
                <Row>
                  <Col md={6}>
                    <label style={{ color: `white` }} htmlFor="stampsname">
                      Stamp's Name:
                    </label>
                    <input
                      type="text"
                      id="stampsname"
                      className={`form-control ${validated ? (errors.stampName ? "is-invalid" : "is-valid") : ""}`}
                      placeholder="Stamp's name"
                      value={stampName}
                      onChange={(e) => setStampName(e.target.value)}
                    />
                    <div className="invalid-feedback">{errors.stampName}</div>
                  </Col>
                  <Col md={6}>
                    <label style={{ color: `white` }} htmlFor="stampsimage">
                      Stamp's Image:
                    </label>
                    <input
                      type="text"
                      id="stampsimage"
                      className="form-control"
                      placeholder="https://..."
                      value={stampImage}
                      onChange={(e) => setStampImage(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label style={{ color: `white` }} htmlFor="country">
                      Country:
                    </label>
                    <GenericDropdown
                      options={countryOptions}
                      id="country"
                      className="form-control"
                      value={country}
                      onChange={setCountry}
                    />
                  </Col>
                  <Col md={6}>
                    <label style={{ color: `white` }} htmlFor="rating">
                      Ratings:
                    </label>
                    <GenericDropdown
                      options={ratingOptions}
                      id="rating"
                      className="form-control"
                      value={rating}
                      onChange={setRating}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <label
                      style={{ color: `white` }}
                      htmlFor="stampsdescription"
                    >
                      Stamp's Description:
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="stampsdescription"
                      placeholder="Stamp's description"
                      value={stampDescription}
                      onChange={(e) => setStampDescription(e.target.value)}
                    />
                  </Col>
                </Row>
                <button
                  className="btn btn-primary mt-4"
                  onClick={(e) => addStamp(e)}
                >
                  Add Stamp
                </button>
              </form>
            </div>
          </Col>

          {/* NON-SCROLLABLE COLUMN */}
          <Col
            md={3}
            xs={12}
            className="position-sticky top-0 vh-100 bg-light p-4"
            style={{
              textAlign: `center`,
              overflowY: "auto",
              backgroundImage: `url(${staticColumnBg})`,
            }} // Keeps content accessible if it's longer than screen height
          >
            <p
              style={{
                backgroundColor: `white`,
                padding: `2rem`,
                borderRadius: `2rem`,
              }}
            >
              <span style={{ fontSize: "4rem" }}>{filteredStampNum}</span> In a
              collection of: {allStamps.length} total stamps
            </p>
            <button
              className="btn btn-secondary mb-1"
              style={{
                width: `80%`,
                borderLeft:
                  currentFilter === "all" ? "8px solid black" : "none",
              }}
              onClick={() => filterStamp("all")}
            >
              All ({allStamps.length})
            </button>
            <button
              className="btn btn-secondary mb-1"
              style={{
                width: `80%`,
                borderLeft: currentFilter === "UK" ? "8px solid black" : "none",
              }}
              onClick={() => filterStamp("UK")}
            >
              UK (
              {allStamps.filter((s) => s.country.toLowerCase() === "uk").length}
              )
            </button>
            <button
              className="btn btn-secondary mb-1"
              style={{
                width: `80%`,
                borderLeft:
                  currentFilter === "Malaysia" ? "8px solid black" : "none",
              }}
              onClick={() => filterStamp("Malaysia")}
            >
              Malaysia (
              {
                allStamps.filter((s) => s.country.toLowerCase() === "malaysia")
                  .length
              }
              )
            </button>
            <button
              className="btn btn-secondary mb-1"
              style={{
                width: `80%`,
                borderLeft:
                  currentFilter === "USA" ? "8px solid black" : "none",
              }}
              onClick={() => filterStamp("USA")}
            >
              USA (
              {
                allStamps.filter((s) => s.country.toLowerCase() === "usa")
                  .length
              }
              )
            </button>
            <button
              className="btn btn-secondary mb-1"
              style={{
                width: `80%`,
                borderLeft:
                  currentFilter === "Australia" ? "8px solid black" : "none",
              }}
              onClick={() => filterStamp("Australia")}
            >
              Australia (
              {
                allStamps.filter((s) => s.country.toLowerCase() === "australia")
                  .length
              }
              )
            </button>
            <img
              src={unionJack}
              alt="union jack flag"
              style={{ width: "80%", height: "auto" }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
