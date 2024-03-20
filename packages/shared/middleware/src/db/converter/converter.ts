import type { QueryDocumentSnapshot, SnapshotOptions, DocumentData, PartialWithFieldValue } from 'firebase/firestore';

export type Converter<Instance, Mapped> = {
    toFirestore: (data: PartialWithFieldValue<Instance>) => Mapped;
    fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>, options: SnapshotOptions) => Instance;
};