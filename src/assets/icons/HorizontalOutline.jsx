export function HorizontalOutline(props) {
    const { color = "#999", size = "19" } = props;
    return (
      <span className="icon-wrap">
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        fill={color}
        d="M.937 15.75V2.25c0-.308.255-.563.563-.563.308 0 .563.255.563.563v13.5a.567.567 0 01-.563.563.567.567 0 01-.563-.563zM15.938 15.75V2.25c0-.308.254-.563.562-.563.308 0 .563.255.563.563v13.5a.567.567 0 01-.563.563.567.567 0 01-.563-.563zM3.938 9c0-.307.254-.563.562-.563h9c.307 0 .563.256.563.563a.567.567 0 01-.563.563h-9A.567.567 0 013.937 9z"
      ></path>
      <path
        fill={color}
        d="M11.648 11.123c0-.143.052-.285.165-.398L13.538 9l-1.725-1.725a.566.566 0 010-.795.566.566 0 01.795 0l2.122 2.123a.58.58 0 010 .795l-2.122 2.122a.566.566 0 01-.795 0 .556.556 0 01-.165-.397zM3.398 9c0-.15.06-.292.165-.397L5.685 6.48a.566.566 0 01.795 0 .566.566 0 010 .795L4.755 9l1.725 1.725a.566.566 0 010 .795.566.566 0 01-.795 0L3.563 9.398A.562.562 0 013.398 9z"
      ></path>
    </svg>
      </span>
    );
  }
  