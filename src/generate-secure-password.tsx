import { ActionPanel, Form, Action, Clipboard, showToast, Toast } from "@raycast/api";
import { useState } from "react";
import { generate } from "generate-password-ts";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");

  const generatePassword = (values: {
    length: string;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }) => {
    const newPassword = generate({
      length: parseInt(values.length || "12"),
      uppercase: values.uppercase,
      numbers: values.numbers,
      symbols: values.symbols,
      excludeSimilarCharacters: true,
    });
    
    setPassword(newPassword);
    Clipboard.copy(newPassword);
    showToast({ style: Toast.Style.Success, title: "Password copied to clipboard!" });
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={generatePassword} />
        </ActionPanel>
      }
    >
      <Form.TextField id="length" title="Length" defaultValue="12" />
      <Form.Checkbox id="uppercase" label="Uppercase Letters" defaultValue={true} />
      <Form.Checkbox id="numbers" label="Numbers" defaultValue={true} />
      <Form.Checkbox id="symbols" label="Special Symbols" defaultValue={true} />
      {password && <Form.Description text={`Generated Password: ${password}`} />}
    </Form>
  );
}