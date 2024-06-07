import * as React from "react";
import { Button } from "@canva/app-ui-kit";
import styles from "styles/components.css";
import { addNativeElement } from "@canva/design";
import { auth } from "@canva/user";
import { fetchClasses, fetchLessons } from "./api-utils";

export function App() {
  async function handleClick() {
    // Add text to the design
    await addNativeElement({
      // Required
      type: "TEXT",
      children: ["oooo"],

      // Optional
      color: "#ff0099",
      decoration: "underline",
      fontStyle: "italic",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 30,
      top: 50,
      left: 50,
      width: 200,
    });
  }

  // TODO: check if the user is authenticated, do not need to authenticate again
  // TODO: store the token in the local storage

  async function handleAuth() {
    // Authenticate the user
    const result = await auth.requestAuthentication();
    console.log(result);
  }
  // add selection of class
  return (
    <div className={styles.scrollContainer}>
      <h2>Classes selection here</h2>
      <Button variant="primary" onClick={handleAuth}>
        Authenticate
      </Button>
      <Button variant="primary" onClick={() => fetchClasses()}>
        Fetch class
      </Button>
      <Button variant="primary" onClick={() => fetchClasses()}>
        Fetch lessons
      </Button>
    </div>
  );
}
