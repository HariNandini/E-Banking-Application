import React, { useState } from "react";

function IdentityVerification() {
  const [idImage, setIdImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Perform identity verification using the uploaded file
    setIdImage(URL.createObjectURL(file));
  };

  return (
    <>
      <label>
        Upload a government-issued ID:
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </label>
      {idImage && <img src={idImage} alt="ID" />}
    </>
  );
}

export default IdentityVerification;
