import Link from "next/link";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  label: string;
  route?: string;
  icon?: string;
  active?: boolean;
  onClick?(): void;
}

const NavItem = ({ icon, label, onClick, route, active }: NavbarLinkProps) => {
  const { classes, cx, theme } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={250}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })} 
        style={{
          backgroundColor: active ? theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).background : '',
        }}
      >
        <Image
          src={`/side_nav/${icon ?? route}.svg`}
          alt=""
          width={50}
          height={50}
        />
      </UnstyledButton>
    </Tooltip>
  );
};

function NavbarLink({ icon, label, route, active }: NavbarLinkProps) {
  return (
    <Link
      href={{
        pathname: `/${route}`,
      }}
    >
      <a>
        <NavItem icon={icon} label={label} route={route} active={active} />
      </a>
    </Link>
  );
}

const navItems = [
  {
    label: "Explore",
    route: "explore",
  },
  {
    label: "For Fundraisers",
    route: "fundraisers",
  },
  {
    label: "For Contributors",
    route: "contributors",
  },
  // {
  //   label: "How It Works",
  //   route: "how_it_works",
  // },
  {
    label: "Create a Fundraiser",
    route: "create",
  },
];

const SideNav = () => {
  const router = useRouter();
  const { setVisible } = useWalletModal();

  const links = navItems.map((link, index) => (
    <NavbarLink
      {...link}
      key={index}
      active={router.pathname.includes(link.route)}
    />
  ));

  const connectWallet = () => {
    setVisible(true)
  };

  return (
    <>
      <div className="max-w-xs fixed bg-green-300">
        <Navbar width={{ base: 80 }} p="md">
          <Center>
            <Image src="/logo.png" alt="" width={60} height={50} />
          </Center>
          <Navbar.Section grow mt={50}>
            <Stack justify="center" spacing={4}>
              {links}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <Stack justify="center" spacing={0}>
              <NavItem
                label="Connect Wallet"
                icon="wallet"
                onClick={connectWallet}
              />
            </Stack>
          </Navbar.Section>
        </Navbar>
      </div>
    </>
  );
};

export default SideNav;
