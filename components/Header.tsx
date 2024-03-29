import {
  createStyles,
  Menu,
  Image,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
} from "@mantine/core";
import styles from "../styles/Home.module.css";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderActionProps {
  links: {
    link: string;
    label: string;
    links: { link: string; label: string }[];
  }[];
}

const mockdata = [
  { link: "/explore", label: "Explore" },
  { link: "/about", label: "Learn More" },
  { link: "/about", label: "Create a Fundraiser" },
];

export function HeaderAction({ links }: HeaderActionProps) {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = mockdata.map((link) => {
    const menuItems =
      link.mockdata &&
      link.mockdata?.map((item) => (
        <Menu.Item key={item.link}>{item.label}</Menu.Item>
      ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        href={{
          pathname: `/${link.link}`,
        }}
      >
        <a className={classes.link} onClick={(event) => event.preventDefault()}>
          {link.label}
        </a>
      </Link>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Image height={25} width={45} src="https://i.imgur.com/ICfPlO6.png" />
        </Group>
        <Group spacing={5} px={150} className={classes.links}>
          {items}
        </Group>
        <Button
          className={styles.headerbutton}
          variant="gradient"
          radius="xl"
          sx={{ height: 30 }}
        >
          Connect Wallet
        </Button>
      </Container>
    </Header>
  );
}

export default HeaderAction;
