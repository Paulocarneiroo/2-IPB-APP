import { useMemo } from "react";
import { Text, StyleSheet, TextStyle, StyleProp } from "react-native";
import { useRouter } from "expo-router";
import { parseBibleReferences } from "../../utils/parseBibleReferences";

type LinkedBibleTextProps = {
  text: string;
  style?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
};

export default function LinkedBibleText({ text, style, linkStyle }: LinkedBibleTextProps) {
  const router = useRouter();
  const segments = useMemo(() => parseBibleReferences(text), [text]);

  return (
    <Text style={style}>
      {segments.map((segment, index) => {
        if (segment.type === "text") {
          return <Text key={`t-${index}`}>{segment.value}</Text>;
        }

        return (
          <Text
            key={`r-${index}`}
            style={[styles.link, linkStyle]}
            onPress={() =>
              router.push({
                pathname: "/bible",
                params: {
                  book: segment.reference.book,
                  chapter: String(segment.reference.chapter),
                  ...(segment.reference.verse
                    ? { verse: String(segment.reference.verse) }
                    : {}),
                },
              })
            }
            suppressHighlighting
          >
            {segment.value}
          </Text>
        );
      })}
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "#055c43",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
