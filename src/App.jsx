import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Container, Row, Col, Card } from "react-bootstrap";
import { FaSmile } from "react-icons/fa";
import staticColumnBg from "./assets/big-ben.jpg";
import headerBg from "./assets/union-jack3.jpg";
import scrollColumnBg from "./assets/reddish.png";
import unionJack from "./assets/union-jack-transparent.png";
import invertedJenny from "./assets/inverted-jenny.jpg";
import stampLogo from "./assets/stamp.png";

const defaultImage = "picsum.photos/200";

// function Stamp({stamps}){
//   return(<>
//   {stamps.map(stamp =>
//   <ul key={stamp.title}>
//     <li>{stamp.title}</li>
//     <li><img src={"https://"+stamp.image} alt="random picture" /></li>
//     <li>Country: {stamp.country}</li>
//     <li>Rating: {stamp.rating}</li>
//   </ul>
//   )}

// </>);
// }
const colors = {
  red: "red",
  grey: "a9a9a9",
};

const stars = Array(5).fill(0);

function Stamp({ stamps }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        textAlign: `center`,
      }}
    >
      {stamps.map((stamp, index) => (
        <Card
          key={index}
          style={{
            borderColor: `blue`,
            borderWidth: `2px`,
            borderRadius: `15px`,
            width: "18rem",
            padding: "1rem",
            backgroundImage: `url(${staticColumnBg})`,
          }}
        >
          <Card.Title>{stamp.title}</Card.Title>
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
            <Card.Subtitle>Country: {stamp.country}</Card.Subtitle>
            {stars.map((_, index) => {
              return (
                <FaSmile
                  key={index}
                  size={14}
                  color={
                    stamp.rating.split("/")[0] > index
                      ? colors.red
                      : colors.grey
                  }
                />
              );
            })}
            <span>({stamp.rating} Stars)</span>
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
  const [allStamps, setAllStamps] = useState([
    {
      title: "Penny Red",
      image:
        "i.guim.co.uk/img/media/2cc141155676166cf43006fe6918827b045c6c6a/0_0_1028_1177/master/1028.jpg?width=380&dpr=2&s=none&crop=none",
      country: "UK",
      rating: "3/5",
    },
    {
      title: "Inverted Jenny",
      image:
        "www.postalmuseum.org/wp-content/uploads/2023/04/inverted-jenny.jpg",
      country: "USA",
      rating: "4/5",
    },
    {
      title: "Malay States",
      image:
        "www.paulfrasercollectibles.com/cdn/shop/files/RS3359_500x.jpg?v=1716542406",
      country: "Malaysia",
      rating: "5/5",
    },
    {
      title: "One Penny",
      image: "www.cherrystoneauctions.com/scans_cache/201908_1770_200_180.jpg",
      country: "UK",
      rating: "4/5",
    },
  ]);
  const [stamps, setStamps] = useState(allStamps);
  const [stampName, setStampName] = useState("");
  const [stampImage, setStampImage] = useState("");
  const [country, setCountry] = useState("UK");
  const [filteredStampNum, setFilteredStampNum] = useState(allStamps.length);
  const [rating, setRating] = useState("1/5");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!stampName.trim()) newErrors.stampName = "Stamp name is required";
    // Optionally validate image URL, country, rating...
    return newErrors;
  }

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

    const imageToUse = stampImage.trim() === "" ? defaultImage : stampImage;
    const newStamp = { title: stampName, image: imageToUse, country, rating };

    const updatedAll = [...allStamps, newStamp];
    setAllStamps(updatedAll);

    // Update stamps and counts based on current filter and new allStamps
    filterStamp(currentFilter, updatedAll);

    // Reset inputs
    setStampName("");
    setStampImage("");
    setCountry("UK");
    setRating("1/5");
  }

  // function addStamp(e){
  //   e.preventDefault();

  //   const imageToUse = stampImage.trim()===""?defaultImage:stampImage
  // const newStamp = {title: stampName, image: imageToUse, country: country, rating: rating};
  // const updatedAll = [...allStamps, newStamp];
  // setAllStamps(updatedAll);

  // if (currentFilter === "all") {
  //   setStamps(updatedAll);
  //   setFilteredStampNum(updatedAll.length);
  // } else {
  //   const filtered = updatedAll.filter(s => s.country === currentFilter);
  //   setStamps(filtered);
  //   setFilteredStampNum(filtered.length);
  // }
  // // reset inputs
  // setStampName("");
  // setStampImage("");
  // setCountry("UK");
  // setRating("1/5");
  // }

  //   function addStamp1(e) {
  //   e.preventDefault();

  //   const imageToUse = stampImage.trim() === "" ? defaultImage : stampImage;
  //   const newStamp = { title: stampName, image: imageToUse, country, rating };
  //   const updatedAll = [...allStamps, newStamp];
  //   setAllStamps(updatedAll);

  //   filterStamp(currentFilter, updatedAll); // Use updatedAll here!

  //   // reset inputs
  //   setStampName("");
  //   setStampImage("");
  //   setCountry("UK");
  //   setRating("1/5");
  // }

  const countryOptions = ["UK", "Malaysia", "USA"];
  const ratingOptions = ["1/5", "2/5", "3/5", "4/5", "5/5"];

  return (
    <>
      <Container fluid>
        <Row>
          {/* SCROLLABLE COLUMN */}
          <Col
            md={9}
            className="pb-4"
            style={{ backgroundImage: `url(${scrollColumnBg})` }}
          >
            <div
              className="sticky-top border border-5"
              style={{
                WebkitTextStroke: `1px black`,
                textAlign: "center",
                borderRadius: `1rem`,
                paddingTop: `1rem`,
                height: "8rem",
                backgroundImage: `url(${headerBg})`,
                color: `red`,
                fontWeight: `4000`,
                fontSize: `2rem`,
                marginBottom: `1rem`,
                display: `flex`,
                flexDirection: `row`,
                justifyContent: `space-evenly`,
                alignItems: `center`,
              }}
            >
              <Image src={stampLogo} width={100} alt="Company Logo" fluid />
              <span style={{ color: `blue` }}>StampsCo</span>
              <h3>Treasured Stamps of the British Empire</h3>
            </div>
            <div style={{ height: "2000px" }}>
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
              style={{ width: `12rem` }}
              onClick={() => filterStamp("all")}
            >
              All ({allStamps.length})
            </button>
            <button
              className="btn btn-secondary mb-1"
              style={{ width: `12rem` }}
              onClick={() => filterStamp("UK")}
            >
              Country:UK (
              {allStamps.filter((s) => s.country.toLowerCase() === "uk").length}
              )
            </button>
            <button
              className="btn btn-secondary mb-1"
              style={{ width: `12rem` }}
              onClick={() => filterStamp("Malaysia")}
            >
              Country:Malaysia (
              {
                allStamps.filter((s) => s.country.toLowerCase() === "malaysia")
                  .length
              }
              )
            </button>
            <button
              className="btn btn-secondary mb-1"
              style={{ width: `12rem` }}
              onClick={() => filterStamp("USA")}
            >
              Country:USA (
              {
                allStamps.filter((s) => s.country.toLowerCase() === "usa")
                  .length
              }
              )
            </button>
            <img
              src={unionJack}
              alt="union jack flag"
              style={{ width: "200px", height: "auto" }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
