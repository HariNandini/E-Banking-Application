import React from 'react'
 import image1 from '../../imgAdmin/image1.jpg';
 import image2 from '../../imgAdmin/image2.jpg';
 import Carousel from 'react-bootstrap/Carousel';
function AdminDashboardpage() {
  const images = [image2,image1];
  return (
    <div style={{'padding': '80px 70px 20px 70px', 'borderRadius': '55px 55px 55px 55px'}} fixed='top'>
    <h1></h1>
    <Carousel>
    {images.map((image, idx) =>(
      <Carousel.Item >
            <img className="d-block w-100"
                  height={600}  alt="First slide"
                  key={idx} src={image}
            />
          <Carousel.Caption>
          </Carousel.Caption>

        </Carousel.Item>

  ))}

</Carousel><br/><br/>

    </div>
  )
}

export default AdminDashboardpage;