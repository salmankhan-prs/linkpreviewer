import React from "react";

const Navbar = () => {
  return (
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">Link Previewer</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li>
            <a
              target="_blank"
              href="https://metatags-generator-backend.herokuapp.com/"
            >
              BACKEND API
            </a>
          </li>

          <li>
            <a> CODE </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
