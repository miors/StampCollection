import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
  import { Container, Row, Col, Card } from 'react-bootstrap';
  import { FaSmile } from 'react-icons/fa';
    import staticColumnBg from './assets/big-ben.jpg'
    import headerBg from './assets/union-jack3.jpg'
    import scrollColumnBg from './assets/reddish.png'
    import unionJack from "./assets/union-jack-transparent.png"
    
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
        grey: "a9a9a9"
    }

    const stars = Array(5).fill(0)


function Stamp({stamps}){
  return(
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', textAlign: `center` }}>
    {stamps.map((stamp, index) => 
<Card key={index}  style={{width: '18rem', padding: '1rem', backgroundImage: `url(${staticColumnBg})`}}>
<Card.Title>{stamp.title}</Card.Title>
<Card.Img variant="top" src={"https://"+stamp.image} style={index === 0 ? { height: '400px', objectFit: 'contain' } : { height: '150px', objectFit: 'contain' }}/>
<Card.Body>
  <Card.Subtitle>Country: {stamp.country}</Card.Subtitle>
  {stars.map((_, index) => {return (<FaSmile
                 key={index}
                 size={14}
                 color={(stamp.rating.split("/")[0]) > index ? colors.red : colors.grey}
              />)})  }
  <span>({stamp.rating} Stars)</span>
</Card.Body>
</Card>

    )}
    </div>
)
  
}




function GenericDropdown({ options, value, onChange, className="", id }) {
  return (
    <select value={value} id={id} className={className} onChange={e => onChange(e.target.value)}>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );}

function App() {
  const [allStamps, setAllStamps] = useState([
  {title:"Penny Farthings", image:"picsum.photos/200", country:"UK", rating:"3/5"},
  {title:"Queens Head", image:"picsum.photos/200", country:"Australia", rating:"4/5"},
  {title:"Malayan Tiger", image:"picsum.photos/200", country:"Malaysia", rating:"5/5"},
  {title:"Sydney Harbour", image:"picsum.photos/200", country:"Australia", rating:"1/5"},
]);
  const [stamps, setStamps] = useState(allStamps)
  const [stampName, setStampName] = useState("")
  const [stampImage, setStampImage] = useState("")
  const [country, setCountry] = useState("UK");
  const [filteredStampNum, setFilteredStampNum] = useState(allStamps.length);
   const [rating, setRating] = useState("1/5");
   const [currentFilter, setCurrentFilter] = useState("all");

  function filterStamp(flag, stampsArray = allStamps){
    setCurrentFilter(flag);
    if (flag === "all"){
      setStamps(stampsArray)
      setFilteredStampNum(stampsArray.length);
    }else {
      const filtered = stampsArray.filter(s => s.country.toLowerCase() === flag.toLowerCase());
    setStamps(filtered);
    setFilteredStampNum(filtered.length);
    }
  }
function addStamp(e) {
  e.preventDefault();

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

  const countryOptions = ['UK', 'Malaysia', 'Australia', 'USA']
  const ratingOptions = ['1/5', '2/5', '3/5', '4/5', '5/5']

  return (
<>
<Container fluid>
      <Row>
        {/* SCROLLABLE COLUMN */}
        <Col md={9} className="pb-4" style={{backgroundImage: `url(${scrollColumnBg})`}}>
          <div className="sticky-top border border-5" style={{WebkitTextStroke: `1px black`, textAlign: 'center', borderRadius: `1rem`, paddingTop: `2rem`, height: '8rem', backgroundImage: `url(${headerBg})`, color: `red`,fontWeight:`4000`, fontSize: `8rem`, marginBottom: `1rem` }}>
          <h3>Treasured Stamps of the British Empire</h3>
          </div>
          <div style={{ height: '2000px' }}>
            <Stamp stamps={stamps} />

     

<form className="mt-5 border p-5 bg-secondary rounded">
  <Row>
    <Col md={6}>
      <label htmlFor="stampsname">Stamp's Name:</label>
      <input
        type="text"
        id="stampsname"
        className="form-control"
        placeholder="Stamp's name"
        value={stampName}
        onChange={e => setStampName(e.target.value)}
      />
      <div class="valid-feedback">Looks good!</div>
    <div class="invalid-feedback">Please type the stamp's name</div>
    </Col>
    <Col md={6}>
      <label htmlFor="stampsimage">Stamp's Image:</label>
      <input
        type="text"
        id="stampsimage"
        className="form-control"
        placeholder="https://..."
        value={stampImage}
        onChange={e => setStampImage(e.target.value)}
      />
    </Col>
  </Row>
  <Row>
    <Col md={6}>
    <label htmlFor="country">Country:</label>
    <GenericDropdown options={countryOptions} id="country" className="form-control" value={country} onChange={setCountry} />
    </Col>
    <Col md={6}>
    <label htmlFor="rating">Ratings:</label>
    <GenericDropdown options={ratingOptions} id="rating" className="form-control" value={rating} onChange={setRating} />
    </Col>
  </Row>
  <button className="btn btn-primary mt-4" onClick={e=>addStamp(e)}>Add Stamp</button>
</form>
          </div>
        </Col>

        {/* NON-SCROLLABLE COLUMN */}
        <Col 
          md={3} 
          className="position-sticky top-0 vh-100 bg-light p-4"
          style={{overflowY: 'auto', backgroundImage: `url(${staticColumnBg})`}} // Keeps content accessible if it's longer than screen height
        >
          <p style={{backgroundColor: `white`, padding: `2rem`, borderRadius: `2rem`}}><span style={{ fontSize: '4rem' }}>{filteredStampNum}</span> In a collection of: {allStamps.length} total stamps</p>
        <button className="btn btn-secondary mb-1" style={{width: `12rem`}} onClick={()=> filterStamp("all")}>All ({allStamps.length})</button>
        <button className="btn btn-secondary mb-1" style={{width: `12rem`}} onClick={()=> filterStamp("UK")}>Country:UK ({allStamps.filter(s => s.country.toLowerCase() === "uk").length})</button>
        <button className="btn btn-secondary mb-1" style={{width: `12rem`}} onClick={()=> filterStamp("Malaysia")}>Country:Malaysia ({allStamps.filter(s => s.country.toLowerCase() === "malaysia").length})</button>
        <button className="btn btn-secondary mb-1" style={{width: `12rem`}} onClick={()=> filterStamp("Australia")}>Country:Australia ({allStamps.filter(s => s.country.toLowerCase() === "australia").length})</button>
         <img src={unionJack} alt="union jack flag" style={{ width: '200px', height: 'auto' }}/>
        </Col>
        
        
      </Row>
    </Container>

    </>
  )
}

export default App
