import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button} from "@nextui-org/react";
import {SearchIcon} from "./search.js";
import styles from './menu.module.css'
import { symbol } from "prop-types";
import { useState } from "react";
import { useRef } from "react";

export default function Menu({ inZoom, searchCallback, messageCallback, addStarCallback }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef()
  const handleKeyUp = ev => {
    if (ev.keyCode === 13) searchCallback(query)
  }
  return (
    <Navbar className={styles.bar}>
      <NavbarContent >
        <NavbarBrand >
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className={styles.search}>
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
        <Dropdown>
          <DropdownTrigger>
            <Button className={styles.text}>
              Echo into the Dark
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>
              <Button className={styles.text2} onClick={addStarCallback}>
                Add a new Star
              </Button>
            </DropdownItem>
            {
              inZoom ? (
              <DropdownItem>
                <Button className={styles.text2} onClick={messageCallback}>
                  Impart a message
                </Button>
              </DropdownItem>
              ) : null
            }
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
    
  );
}