export const state = () => ({
    defences: [{
            id: 1,
            monster1: 'ナナ',
            monster2: 'サバナ',
            monster3: 'ラカン',
            memo: 'サバナの破壊に注意/JOWはラカン耐久型が多い。',
            rank: 5,
        },
        {
            id: 2,
            monster1: 'オフィーリア',
            monster2: 'ヴィゴル',
            monster3: 'オーディン',
            memo: '',
            rank: 5,
        },
        {
            id: 3,
            monster1: 'スコグル',
            monster2: 'ヴィゴル',
            monster3: 'モーリー',
            memo: '',
            rank: 4,
        },
    ],
    offenceLists: [{
            id: 1,
            defence_id: 1,
            monster1: 'ラカン',
            monster1_memo: '吸血or暴走意志・クリダメか率型',
            monster2: 'カミラ',
            monster2_memo: '暴走・速度+120以上',
            monster3: 'ウィンディ',
            monster3_memo: '絶望反撃・AF火軽減必須',
            memo: 'サバナ２回落とし。ラカンは最後まで触らない。',
            rate: 100
        },
        {
            id: 2,
            defence_id: 1,
            monster1: '火アーク',
            monster1_memo: '暴走',
            monster2: 'ルル',
            monster2_memo: '暴走・風軽減必須',
            monster3: 'ウィンディ',
            monster3_memo: '絶望反撃・AF火軽減必須',
            memo: '免疫を途切れさせないようにする',
            rate: 90
        },
        {
            id: 3,
            defence_id: 2,
            monster1: 'シュレン',
            monster1_memo: '激怒刃、クリ率100、速度無振り',
            monster2: 'テオン',
            monster2_memo: 'ヴィゴルの上取り必須、最速ルーン',
            monster3: 'ナナ',
            monster3_memo: '耐久・風軽減AF',
            memo: '初手リモでヴィゴルを飛ばす',
            rate: 100
        }
    ]
})

export const getters = {
    getDefences(state) {
        return state.defences
    },
    getOffences: state => (id) => {
        return state.offenceLists.filter(function(item) {
            return item.defence_id === parseInt(this, 10)
        }, id)
    },
}

export const mutations = {
    addUser(state, paylaod) {
        state.users.push(paylaod.user)
    },
    updateUser(state, paylaod) {
        state.users.forEach((user, index) => {
            if (user.id === paylaod.user.id) {
                state.users.splice(index, 1, paylaod.user)
            }
        })
    },
    removeUser(state, paylaod) {
        state.users.forEach((user, index) => {
            if (user.id === paylaod.user.id) {
                state.users.splice(index, 1)
            }
        })
    }
}

export const actions = {
    /**
     * 連絡先の編集
     */
    async updateContact({ dispatch, state }, value) {
        await this.$axios.$put(
            `https://std3app.herokuapp.com/api/contacts/${state.id}`,
            value
        )
    },
}
