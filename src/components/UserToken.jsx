import * as React from "react";

export const UserToken = React.memo(({ user, isSelf, index }) => {
  return (
    <>
      <div
        key={user.id + "_token"}
        cx={32 + 16 * index}
        cy={32}
        r={16}
        strokeWidth={2}
        stroke="white"
        fill={user.isActive ? user.color : "grey"}
      >
        User
      </div>
      {isSelf && <div style={{ color: user.color }}>A</div>}
    </>
  );
});
