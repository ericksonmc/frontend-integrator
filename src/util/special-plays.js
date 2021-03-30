function permute(value) {
    const digits = value.split('');
    const variant1 = [digits[0], digits[2], digits[1]];
    const variant2 = [digits[1], digits[0], digits[2]];

    const values = new Set([
        digits.join(''),
        variant1.join(''),
        variant2.join(''),
        digits.reverse().join(''),
        variant1.reverse().join(''),
        variant2.reverse().join(''),
    ]);

    return Array.from(values).sort();
}

function serie(value) {
    const values = [];
    let i = 1;

    do {
        values.push(i + value);
        i++;
    } while (i < 10);

    return values;
}

function range(from, to) {
    let f = Number(from),
        t = Number(to);

    if (f > t) {
        return [];
    }

    const values = [];

    do {
        values.push(f.toString());
        f++;
    } while (f <= t);

    return values;
}

export function getPermutePlays(values) {
    const permutes = [],
        twoNumbers = [];

    for (const v of values) {
        if (v.length === 2) {
            twoNumbers.push(v);
            continue;
        }

        permutes.push(...permute(v));
    }

    permutes.push(...twoNumbers);

    return permutes;
}

export function getSeriePlays(values) {
    const series = [];

    for (const v of values) {
        if (v.length === 3) {
            series.push(v);
            continue;
        }
        series.push(...serie(v));
    }

    return series;
}

export function getRangePlays(value) {
    if (value.length > 2) {
        return '';
    }
    return range(...value);
}

export function getTerminalPlays(value) {
    return value.map((play) => {
        if (play.length < 3) {
            return play;
        }

        return play.slice(1);
    });
}
