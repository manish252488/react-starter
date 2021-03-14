import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import {
  ExpandMoreOutlined,
  HomeOutlined,
  LocalMallOutlined,
  PermContactCalendarOutlined,
  SettingsOutlined,
} from "@material-ui/icons";
import History from "../../@history";
import { IconButton, ListItemIcon, ListItemText } from "@material-ui/core";
import "./index.less";
const lang = [
  {
    icon: <HomeOutlined />,
    name: "Home",
    path: "/",
  },
  {
    icon: <SettingsOutlined />,
    name: "Services",
    path: "/services",
  },
  {
    icon: <LocalMallOutlined />,
    name: "Products",
    path: "/products",
  },
  {
    icon: <PermContactCalendarOutlined />,
    name: "Contact",
    path: "/contacts",
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MoreOptions() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const selectLanguage = (la, ev) => {
    History.push(la);
    handleClose(ev);
  };
  return (
    <div className={classes.root + " more-options"}>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
      >
        <ExpandMoreOutlined />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {lang.map((val, index) => (
                    <MenuItem
                      key={index}
                      onClick={(event) => selectLanguage(val.path, event)}
                    >
                      <ListItemIcon>{val.icon}</ListItemIcon>
                      <ListItemText primary={val.name} />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}