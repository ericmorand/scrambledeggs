type Sanitize<T> = [T] extends [never] ? "never" : "not never";

type CleanedTypeNever = Sanitize<never>; // "never"
type CleanedTypeString = Sanitize<string>; // "not never"
type CleanedTypeNumber = Sanitize<number>; // "not never"

type SanitizeRecord<T> = T extends Record<infer K, any> ? ([K] extends [never] ? undefined : Record<K, string>) : T;

type S = SanitizeRecord<{}>;
type T = SanitizeRecord<Record<string, any>>;