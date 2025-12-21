import mongoose from "mongoose";
declare const EventModel: mongoose.Model<{
    isActive: boolean;
    rows: mongoose.Types.DocumentArray<{
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }> & {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }>;
    major?: mongoose.Types.ObjectId | null;
    year?: string | null;
    className?: mongoose.Types.ObjectId | null;
    createdBy?: mongoose.Types.ObjectId | null;
    september?: string | null;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    isActive: boolean;
    rows: mongoose.Types.DocumentArray<{
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }> & {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }>;
    major?: mongoose.Types.ObjectId | null;
    year?: string | null;
    className?: mongoose.Types.ObjectId | null;
    createdBy?: mongoose.Types.ObjectId | null;
    september?: string | null;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    isActive: boolean;
    rows: mongoose.Types.DocumentArray<{
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }> & {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }>;
    major?: mongoose.Types.ObjectId | null;
    year?: string | null;
    className?: mongoose.Types.ObjectId | null;
    createdBy?: mongoose.Types.ObjectId | null;
    september?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    isActive: boolean;
    rows: mongoose.Types.DocumentArray<{
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }> & {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }>;
    major?: mongoose.Types.ObjectId | null;
    year?: string | null;
    className?: mongoose.Types.ObjectId | null;
    createdBy?: mongoose.Types.ObjectId | null;
    september?: string | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    isActive: boolean;
    rows: mongoose.Types.DocumentArray<{
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }> & {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }>;
    major?: mongoose.Types.ObjectId | null;
    year?: string | null;
    className?: mongoose.Types.ObjectId | null;
    createdBy?: mongoose.Types.ObjectId | null;
    september?: string | null;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    isActive: boolean;
    rows: mongoose.Types.DocumentArray<{
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }> & {
        [x: number]: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        [Symbol.iterator]: {} | null;
        find: {} | null;
        readonly [Symbol.unscopables]: {
            [x: number]: unknown;
            [Symbol.iterator]?: unknown;
            find?: unknown;
            [Symbol.unscopables]?: unknown;
            length?: unknown;
            toString?: unknown;
            toLocaleString?: unknown;
            pop?: unknown;
            push?: unknown;
            concat?: unknown;
            join?: unknown;
            reverse?: unknown;
            shift?: unknown;
            slice?: unknown;
            sort?: unknown;
            splice?: unknown;
            unshift?: unknown;
            indexOf?: unknown;
            lastIndexOf?: unknown;
            every?: unknown;
            some?: unknown;
            forEach?: unknown;
            map?: unknown;
            filter?: unknown;
            reduce?: unknown;
            reduceRight?: unknown;
            findIndex?: unknown;
            fill?: unknown;
            copyWithin?: unknown;
            entries?: unknown;
            keys?: unknown;
            values?: unknown;
            includes?: unknown;
            flatMap?: unknown;
            flat?: unknown;
            at?: unknown;
            findLast?: unknown;
            findLastIndex?: unknown;
            toReversed?: unknown;
            toSorted?: unknown;
            toSpliced?: unknown;
            with?: unknown;
        } | null;
        length: unknown;
        toString: {} | null;
        toLocaleString: {} | null;
        pop: {} | null;
        push: {} | null;
        concat: {} | null;
        join: {} | null;
        reverse: {} | null;
        shift: {} | null;
        slice: {} | null;
        sort: {} | null;
        splice: {} | null;
        unshift: {} | null;
        indexOf: {} | null;
        lastIndexOf: {} | null;
        every: {} | null;
        some: {} | null;
        forEach: {} | null;
        map: {} | null;
        filter: {} | null;
        reduce: {} | null;
        reduceRight: {} | null;
        findIndex: {} | null;
        fill: {} | null;
        copyWithin: {} | null;
        entries: {} | null;
        keys: {} | null;
        values: {} | null;
        includes: {} | null;
        flatMap: {} | null;
        flat: {} | null;
        at: {} | null;
        findLast: {} | null;
        findLastIndex: {} | null;
        toReversed: {} | null;
        toSorted: {} | null;
        toSpliced: {} | null;
        with: {} | null;
        0: mongoose.Types.DocumentArray<{
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }> & {
            type?: {
                name: mongoose.Types.ObjectId;
                period: string;
                room: string;
            } | null;
        }>;
        1: unknown;
    }>;
    major?: mongoose.Types.ObjectId | null;
    year?: string | null;
    className?: mongoose.Types.ObjectId | null;
    createdBy?: mongoose.Types.ObjectId | null;
    september?: string | null;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default EventModel;
//# sourceMappingURL=timeTableEvent.model.d.ts.map