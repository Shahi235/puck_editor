import {  FieldLabel, type Config } from "@measured/puck";
import { Button, Divider, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

type Props = {
  Form: { items: any[] };
};

export const config: Config<Props> = {
  components: {
    Form: {
        fields :{
          items: {
            type: "array",
            getItemSummary: (item, i) => item.title || `Feature #${i}`,
            defaultItemProps: {
              Label: "Title",
              box: {
                type: "text",
                inputValue: "",
              },
            },
            arrayFields: {
              Label: { type: "text" },
              box: {
                type: "custom",
                label: "Choose type",
                render: ({
                  name,
                  onChange,
                  value = { type: "text", inputValue: "" },
                  field,
                }) => {
                  console.log("value", value);
                  return (
                    <>
                      <FieldLabel label={field.label}>
                        <Select
                          value={value.type}
                          style={{ width: 120 }}
                          onChange={(newType) => {
                            onChange({ type: newType, inputValue: "" }); // Reset value when changing type
                          }}
                          options={[
                            { label: "input", value: "text" },
                            { label: "checkbox", value: "checkbox" },
                            { label: "button", value: "button" },
                            // { label: "radio", value: "radio" },
                            { label: "textarea", value: "textarea" },
                          ]}
                        />
                      </FieldLabel>
                      <Divider dashed />
                      {value.type === "text" && (
                        <Input
                          value={value.inputValue}
                          onChange={(e) =>
                            onChange({ ...value, inputValue: e.target.value })
                          }
                          placeholder="Enter text..."
                        />
                      )}

                      {value.type === "button" && (
                        <Input
                          value={value.inputValue}
                          onChange={(e) =>
                            onChange({ ...value, inputValue: e.target.value })
                          }
                          placeholder="Enter Button text..."
                        />
                      )}

                      {value.type === "textarea" && (
                        <TextArea
                          rows={4}
                          value={value.inputValue}
                          onChange={(e) =>
                            onChange({ ...value, inputValue: e.target.value })
                          }
                          placeholder="Enter description..."
                          maxLength={600}
                        />
                      )}
                    </>
                  );
                },
              },
            },
          },
        },
      

      defaultProps: {
        items: [
          {
            Label: "Label",
            box: {
              type: "text",
              inputValue: "",
            },
          },
        ],
      },
      render: ({ items }) => {
        // console.log("itemsRender",items)
        return (
          <div>
            {items.map((item, i) => {
              console.log("item?.box", item);
              console.log("item?.label", item?.label);

              return (
                <div
                  key={i}
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white",
                    gap: "8px",
                    overflow: "hidden",
                    width: "100%",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      color: "black",
                      gap: "6px",
                      overflow: "hidden",
                      width: "100%",
                      fontSize: "22px",
                      textAlign: "center",
                      fontWeight: 600,
                      opacity: 0.8,
                      margin: "5px",
                    }}
                  >
                    {item.Label}
                  </div>
                  {item?.box?.type === "text" && (
                    <Input value={item?.box?.inputValue} />
                  )}

                  {item?.box?.type === "textarea" && (
                    <TextArea
                      rows={7}
                      value={item?.box?.inputValue}
                      placeholder="Enter description..."
                      maxLength={600}
                    />
                  )}

                  {item?.box?.type === "button" && (
                    <Button type="primary" className="primary-button">
                      {item?.box?.inputValue}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        );
      },
    },
  },
};

export default config;
