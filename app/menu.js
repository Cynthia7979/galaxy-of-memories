import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function Menu() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Echo into the Dark
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">Add a new Star</DropdownItem>
        <DropdownItem key="search">Search the Stars</DropdownItem>
        <DropdownItem key="message">Impart a message</DropdownItem>
        <DropdownItem key="home">Return to exploration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}