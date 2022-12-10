import React from "react";
import { Space, Table, Tag, Divider, Radio, Button } from "antd";
import { Popconfirm } from "antd";
import { useState } from "react";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Number of slides",
    dataIndex: "slides",
    key: "slides",
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Edit {record.name}</a> */}
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => console.log("Confirm")}
          onCancel={() => console.log("Cancel")}
        >
          <a
            className="btn btn-primary"
            href="#"
            style={{
              textDecoration: "none",
            }}
          >
            Edit
          </a>
        </Popconfirm>
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => console.log("Confirm")}
          onCancel={() => console.log("Cancel")}
        >
          <a
            className="btn btn-danger"
            href="#"
            style={{
              textDecoration: "none",
            }}
          >
            Delete
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "Presentation 1",
    slides: 30,
    owner: "username",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Presentation 2",
    slides: 3,
    owner: "username",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Presentation 3",
    slides: 4,
    owner: "username",
    tags: ["cool", "teacher"],
  },
];

export default function ListPresentation() {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };
  console.log("selectedRows: : :", Object.entries(selectedRows));

  return (
    <React.Fragment>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        {Object.entries(selectedRows).length > 0 ? (
          <Button danger>Delete</Button>
        ) : (
          ""
        )}
      </Radio.Group>
      <Divider />
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      ;
    </React.Fragment>
  );
}
