import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button} from "@nextui-org/react";
import {SearchIcon} from "./search.js";
import { useState } from "react";
import { useRef } from "react";

export default function Menu({ searchCallback }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef()
  const handleKeyUp = ev => {
    if (ev.keyCode === 13) searchCallback(query)
  }
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">Galaxy of Memories</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search the Stars..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          ref={inputRef}
          onKeyUp={handleKeyUp}
          onChange={e => setQuery(e.currentTarget.value)}
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button>
              Echo into the Dark
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings">Add a new Star</DropdownItem>
            <DropdownItem key="team_settings">Impart a message</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    
  );
}