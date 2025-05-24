// AvatarUser.js
import React from "react";
import PropTypes from "prop-types";

const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2); 
};

const getRandomColor = (seed) => {
  const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A1"];
  const index = Math.abs(seed.charCodeAt(0) % colors.length);
  return colors[index];
};

const AvatarUser = ({ name, id, size = 32 }) => {
  const initials = getInitials(name);
  const backgroundColor = getRandomColor(id || name);

  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor,
        fontSize: size / 2,
      }}
    >
      {initials}
    </div>
  );
};

AvatarUser.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  size: PropTypes.number,
};

export default AvatarUser;
