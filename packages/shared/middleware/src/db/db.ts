import type {
    doc,
    getDoc,
    setDoc,
    addDoc,
    getDocs,
    collection,
    Firestore,
    FirestoreDataConverter,
    query,
    where,
    updateDoc,
} from 'firebase/firestore';

export interface DBData {
    db: Firestore;
    doc: typeof doc;
    getDoc: typeof getDoc;
    setDoc: typeof setDoc;
    addDoc: typeof addDoc;
    collection: typeof collection;
    query: typeof query;
    where: typeof where;
    getDocs: typeof getDocs;
    updateDoc: typeof updateDoc;
}

interface CollectionData<T> {
    data: T;
    path: string;
    pathSegments: string[];
    converter?: FirestoreDataConverter<T>;
    id?: string;
}

export default class DB {
    constructor(private data: DBData) { }

    public updateDoc<T>({ path, pathSegments, converter, data }: CollectionData<T>) {
        const ref = this.data.doc(this.data.db, path, ...pathSegments)
            .withConverter(converter);

        console.log('ref', ref.id);

        return this.data.updateDoc(ref, data as any);
    }

    public async getAllCollectionItem<T>({ path, pathSegments, converter }: Omit<CollectionData<T>, 'data'>) {
        const query = this.data.query(
            this.data.collection(this.data.db, path, ...pathSegments)
                .withConverter(converter),
            this.data.where('id', '!=', '')
        );

        return this.data.getDocs(query)
            .then((querySnapshot) => {
                return querySnapshot.docs.map((doc) => doc.data());
            });
    }

    public async addCollectionItem<T>({ path, pathSegments, converter, data }: CollectionData<T>) {
        const ref = this.data.doc(this.data.db, path, ...pathSegments)
            .withConverter(converter);

        return this.data.setDoc(ref, data);
    };
}