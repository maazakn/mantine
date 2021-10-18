import { createStyles, getThemeColor, getFontStyles, MantineColor } from '@mantine/styles';

interface AlertStyles {
  color: MantineColor;
}

export default createStyles((theme, { color }: AlertStyles) => ({
  root: {
    ...getFontStyles(theme),
    position: 'relative',
    overflow: 'hidden',
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.sm,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : getThemeColor({ theme, color, shade: 0 }),
  },

  wrapper: {
    display: 'flex',
  },

  body: {
    flex: 1,
  },

  title: {
    boxSizing: 'border-box',
    color: getThemeColor({ theme, color, shade: theme.colorScheme === 'dark' ? 5 : 7 }),
    margin: 0,
    marginBottom: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    lineHeight: theme.lineHeight,
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
  },

  label: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  icon: {
    color: getThemeColor({ theme, color, shade: theme.colorScheme === 'dark' ? 5 : 7 }),
    lineHeight: 1,
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: theme.spacing.md,
    marginTop: 1,
  },

  message: {
    ...getFontStyles(theme),
    lineHeight: theme.lineHeight,
    borderBottomLeftRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:only-child': {
      borderTopRightRadius: theme.radius.sm,
      borderTopLeftRadius: theme.radius.sm,
    },
  },

  closeButton: {
    marginTop: 2,
  },
}));