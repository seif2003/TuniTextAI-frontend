type Collection = {
    id: number;
    title: string;
    creationDate: string | null;
    texts: {
        id: number;
        title: string;
        body: string;
        operation: string;
        result: string;
    }[];
};

export type { Collection };