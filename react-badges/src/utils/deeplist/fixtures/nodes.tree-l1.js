const fixture = [
  {
    id: "n1",
    children: [
      {
        id: "n1-1",
        children: [],
        parentId: "n1",
        status: false,
        title: "n1-1"
      },
      {
        id: "n1-2",
        children: [],
        parentId: "n1",
        status: false,
        title: "n1-2"
      }
    ],
    parentId: null,
    status: false,
    title: "n1"
  },
  {
    id: "n2",
    children: [
      {
        id: "n2-1",
        children: [],
        parentId: "n2",
        status: false,
        title: "n2-1"
      }
    ],
    parentId: null,
    status: false,
    title: "n2"
  },
  {
    id: "n3",
    children: [],
    parentId: null,
    status: false,
    title: "n3"
  }
];

export default fixture;
