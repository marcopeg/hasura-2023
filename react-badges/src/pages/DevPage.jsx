import { useState, useEffect, useRef } from "react";
import { Box, Stack, Button } from "@mui/material";
import { usePubSub } from "../utils/use-pubsub";
import AddTask from "../components/AddTask";
import TreeTable from "../TreeTable";
import backlog from "../backlog.json";

const empty = {
  collapse: [],
  items: []
};

const DEFAULT_DOCUMENT = true
  ? backlog
  : {
      collapse: [],
      items: [
        { id: 1, parentId: null, title: "foo", status: false },
        { id: 2, parentId: 1, title: "faa", status: false },
        { id: 3, parentId: null, title: "fii", status: false }
      ]
    };

const DevPage = () => {
  const { subscribe } = usePubSub();
  const [data, setData] = useState(null);
  const treeTableRef = useRef();

  // Import source code from the data so to make it editable
  const [src, setSrc] = useState({});
  useEffect(() => {
    setSrc(JSON.stringify(data, null, 2));
  }, [data]);

  // export::json
  useEffect(
    () =>
      subscribe("export::json", () => {
        const el = document.createElement("a");

        el.setAttribute(
          "href",
          `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(data, null, 2)
          )}`
        );
        el.setAttribute("download", "liste123-backlog.json");
        el.click();
      }),
    [data]
  );

  // export::clipboard
  useEffect(
    () =>
      subscribe("export::clipboard", () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      }),
    [data]
  );

  // import::file
  useEffect(
    () =>
      subscribe("import::file", (evt) => {
        const reader = new FileReader();
        reader.onload = (evt) => setData(JSON.parse(evt.target.result));
        reader.readAsText(evt.target.files[0]);
      }),
    []
  );

  // Load document from LocalStorage snapshot
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("liste123-wip"));
      if (data) {
        setData(data);
      } else {
        setData(DEFAULT_DOCUMENT);
      }
    } catch (err) {
      console.log(`NOPE: ${err.message}`);
      setData(DEFAULT_DOCUMENT);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!data) return;
    localStorage.setItem("liste123-wip", JSON.stringify(data));
  }, [data]);

  return (
    <Box>
      <Stack direction="row" spacing={4}>
        <Box sx={{ flex: 1 }}>
          <Stack spacing={2}>
            <AddTask
              placeholder={"(Ctrl + P) Prepend a new item"}
              shortcut={"Ctrl + p"}
              onSubmit={(title) =>
                treeTableRef.current.prepend({
                  title
                })
              }
            />

            {data ? (
              <TreeTable ref={treeTableRef} data={data} onChange={setData} />
            ) : (
              <Box>loading project...</Box>
            )}

            <AddTask
              placeholder={"(Ctrl + A) Append a new item"}
              shortcut={"Ctrl + a"}
              onSubmit={(title) =>
                treeTableRef.current.append({
                  title
                })
              }
            />
          </Stack>
        </Box>

        <Stack sx={{ width: "35vw" }}>
          <Stack direction="row" justifyContent="space-between">
            <h4>Edit Document:</h4>
            <Stack direction="row">
              <Button onClick={() => setData(empty)}>Reset</Button>
              <Button onClick={() => setData(JSON.parse(src))}>Apply</Button>
            </Stack>
          </Stack>
          <textarea
            rows={30}
            style={{ fontSize: 10, height: "70vh" }}
            value={src}
            onChange={(e) => setSrc(e.target.value)}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default DevPage;
