const { SlashCommandBuilder } = require('discord.js');

const cooldown = new Set();
const cooldownTime = 5000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xivmarket')
        .setDescription('Frage die top 3 Preise eines FF14 Items ab')
        .addStringOption(option =>
            option.setName('item')
                .setDescription('Welches Item suchst du?')
                .setRequired(true)),

    async execute(interaction) {

        var item = interaction.options.getString('item');

        if (cooldown.has(interaction.user.id)) {

            interaction.reply({ content: "Brudi du bist noch auf Cooldown, warte bitte.", ephemeral: true });

        }
        else {

            await interaction.reply({ content: 'Gib mir ne Sekunde.', ephemeral: true })

            const fetch = require('node-fetch');

            const DC_NAMES = ['Chaos', 'Light'];

            const norm = s => s
                ? s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()
                : '';

            function levenshtein(a = '', b = '') {
                const m = a.length, n = b.length;
                const dp = Array.from({ length: m + 1 }, (_, i) => [i].concat(Array(n).fill(0)));
                for (let j = 0; j <= n; j++) dp[0][j] = j;
                for (let i = 1; i <= m; i++) {
                    for (let j = 1; j <= n; j++) {
                        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                        dp[i][j] = Math.min(
                            dp[i - 1][j] + 1,
                            dp[i][j - 1] + 1,
                            dp[i - 1][j - 1] + cost
                        );
                    }
                }
                return dp[m][n];
            }

            async function findItem(query) {
                const languages = ['de', 'en'];
                const nq = norm(query);
                const MAX_DIST = 5;

                for (const lang of languages) {
                    const url = `https://cafemaker.wakingsands.com/search?indexes=item&string=${encodeURIComponent(query)}&language=${lang}`;
                    try {
                        const res = await fetch(url);
                        if (!res.ok) continue;
                        const data = await res.json();
                        if (!data.Results || !data.Results.length) continue;

                        const exact = data.Results.find(r => norm(r.Name) === nq);
                        if (exact) return { id: exact.ID, name: exact.Name };

                        let best = null;
                        for (const r of data.Results) {
                            const dist = levenshtein(nq, norm(r.Name));
                            if (dist <= MAX_DIST && (!best || dist < best.dist)) {
                                best = { id: r.ID, name: r.Name, dist };
                            }
                        }

                        if (best) return best;

                    } catch (err) {
                    }
                }

                return null;
            }


            async function fetchListingsEU(itemId, listingsPerDc = 100) {
                const listings = [];
                for (const dc of DC_NAMES) {
                    const url = `https://universalis.app/api/v2/${dc}/${itemId}?listings=${listingsPerDc}`;
                    try {
                        const res = await fetch(url);
                        if (!res.ok) continue;
                        const data = await res.json();
                        if (Array.isArray(data.listings)) {
                            data.listings.forEach(L => {
                                if (typeof L.pricePerUnit === 'number')
                                    listings.push({ ...L, dc, total: L.pricePerUnit * (L.quantity || 1) });
                            });
                        }
                    } catch { }
                }
                return listings;
            }

            async function getTop3EUPrices(query) {
                try {
                    const item = await findItem(query);
                    if (!item) return [`Fehler: Item nicht gefunden! (${query})`];

                    const listings = await fetchListingsEU(item.id);
                    if (!listings.length) return [`Keine Listings für "${item.name}" gefunden`];

                    listings.sort((a, b) => a.pricePerUnit - b.pricePerUnit || a.quantity - b.quantity);

                    return listings.slice(0, 3).map((l, i) => ({
                        rank: i + 1,
                        itemId: item.id,
                        itemName: item.name,
                        dc: l.dc,
                        world: l.worldName || l.world || '<unknown>',
                        hq: !!l.hq,
                        pricePerUnit: l.pricePerUnit,
                        quantity: l.quantity,
                        total: l.total
                    }));

                } catch (e) {
                    return
                }
            }
            module.exports = { getTop3EUPrices };

            (async () => {
                const listings = await getTop3EUPrices(item);

                if (!listings || typeof listings[0] === 'string') {
                    interaction.editReply(`Item nicht gefunden, entweder Schreibfehler oder keine Listings`)
                    return;
                }

                const itemName = listings[0].itemName;

                const price1 = listings[0].pricePerUnit;
                const price2 = listings[1]?.pricePerUnit;
                const price3 = listings[2]?.pricePerUnit;

                const world1 = listings[0].world;
                const world2 = listings[1]?.world;
                const world3 = listings[2]?.world;

                const quantity1 = listings[0].quantity;
                const quantity2 = listings[1]?.quantity;
                const quantity3 = listings[2]?.quantity;


                interaction.editReply(`> Folgende Listings wurden für **${itemName}** gefunden:\n> \n> ### 📌${world1}: ${price1} Gil, ${quantity1} Stück\n> \n> ### 📌${world2}: ${price2} Gil, ${quantity2} Stück\n> \n> ### 📌${world3}: ${price3} Gil, ${quantity3} Stück`)
            })();





            cooldown.add(interaction.user.id);
            setTimeout(() => {
                cooldown.delete(interaction.user.id);
            }, cooldownTime);

        }
    },
};