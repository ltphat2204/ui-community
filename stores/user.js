export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    getters: {
        isLoggedIn: (state) => !!state.user,
    },
    actions: {
        setUser(user) {
            this.user = user
        },
        logout() {
            this.user = null
        }
    },
})