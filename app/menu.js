import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button} from "@nextui-org/react";
import {SearchIcon} from "./search.js";
import styles from './menu.module.css'
import { symbol } from "prop-types";
import { useState } from "react";
import { useRef } from "react";

export default function Menu({ searchCallback }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef()
  const handleKeyUp = ev => {
    if (ev.keyCode === 13) searchCallback(query)
  }
  return (
    <Navbar className={styles.bar}>
      <NavbarContent >
        <NavbarBrand >
          <p className={styles.title}>Galaxy of Memories</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className={styles.search}>
        <Input
          placeholder="Search the Stars..."
          startContent={<SearchIcon size={18} className={styles.icon}/>}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button className={styles.text}>
              Echo into the Dark
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>
              <Button className={styles.text2}>
                Add a new Star
              </Button>
            </DropdownItem>
            <DropdownItem>
              <Button className={styles.text2}>
                Impart a message
              </Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    
  );
}