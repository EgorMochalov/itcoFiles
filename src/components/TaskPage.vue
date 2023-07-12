<template>
    <b-container class="taskBody" v-if="itemId">
        <b-form v-on:submit="saveTask">
            <div class="d-flex justify-content-between align-items-center">
                <b-link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M9.66088 8.53078C9.95402 8.23813 9.95442 7.76326 9.66178 7.47012C9.36913 7.17698 8.89426 7.17658 8.60112 7.46922L9.66088 8.53078ZM4.47012 11.5932C4.17698 11.8859 4.17658 12.3607 4.46922 12.6539C4.76187 12.947 5.23674 12.9474 5.52988 12.6548L4.47012 11.5932ZM5.51318 11.5771C5.21111 11.2936 4.73648 11.3088 4.45306 11.6108C4.16964 11.9129 4.18475 12.3875 4.48682 12.6709L5.51318 11.5771ZM8.61782 16.5469C8.91989 16.8304 9.39452 16.8152 9.67794 16.5132C9.96136 16.2111 9.94625 15.7365 9.64418 15.4531L8.61782 16.5469ZM5 11.374C4.58579 11.374 4.25 11.7098 4.25 12.124C4.25 12.5382 4.58579 12.874 5 12.874V11.374ZM15.37 12.124V12.874L15.3723 12.874L15.37 12.124ZM17.9326 13.1766L18.4614 12.6447V12.6447L17.9326 13.1766ZM18.25 15.7351C18.2511 16.1493 18.5879 16.4841 19.0021 16.483C19.4163 16.4819 19.7511 16.1451 19.75 15.7309L18.25 15.7351ZM8.60112 7.46922L4.47012 11.5932L5.52988 12.6548L9.66088 8.53078L8.60112 7.46922ZM4.48682 12.6709L8.61782 16.5469L9.64418 15.4531L5.51318 11.5771L4.48682 12.6709ZM5 12.874H15.37V11.374H5V12.874ZM15.3723 12.874C16.1333 12.8717 16.8641 13.1718 17.4038 13.7084L18.4614 12.6447C17.6395 11.8276 16.5267 11.3705 15.3677 11.374L15.3723 12.874ZM17.4038 13.7084C17.9435 14.245 18.2479 14.974 18.25 15.7351L19.75 15.7309C19.7468 14.572 19.2833 13.4618 18.4614 12.6447L17.4038 13.7084Z"
                            fill="#000000" />
                    </svg>
                    <span>Вернуться</span>
                </b-link>
                <b-button type="submit" variant="success" class="mt-3">Сохранить</b-button>
            </div>
            <div class="taskContainer pb-3">
                <h5 class="mt-3 text-start">Названия</h5>
                <b-form-input required v-model="currentItem.text"></b-form-input>
                <h5 class="mt-3 text-start">Описания</h5>
                <b-form-textarea rows="3" v-model="currentItem.descr" no-resize></b-form-textarea>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <input type="file" accept="image/*" v-on:change="downloadImg" />
                    <b-form-checkbox v-model="checkBox">Удалить изображение</b-form-checkbox>
                </div>
                <img class="mt-3" :src="currentItem.img">
            </div>
        </b-form>
    </b-container>
    <b-container class="taskBody" v-else>
        <b-form v-on:submit="addTask">
            <div class="d-flex justify-content-between align-items-center">
                <b-link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M9.66088 8.53078C9.95402 8.23813 9.95442 7.76326 9.66178 7.47012C9.36913 7.17698 8.89426 7.17658 8.60112 7.46922L9.66088 8.53078ZM4.47012 11.5932C4.17698 11.8859 4.17658 12.3607 4.46922 12.6539C4.76187 12.947 5.23674 12.9474 5.52988 12.6548L4.47012 11.5932ZM5.51318 11.5771C5.21111 11.2936 4.73648 11.3088 4.45306 11.6108C4.16964 11.9129 4.18475 12.3875 4.48682 12.6709L5.51318 11.5771ZM8.61782 16.5469C8.91989 16.8304 9.39452 16.8152 9.67794 16.5132C9.96136 16.2111 9.94625 15.7365 9.64418 15.4531L8.61782 16.5469ZM5 11.374C4.58579 11.374 4.25 11.7098 4.25 12.124C4.25 12.5382 4.58579 12.874 5 12.874V11.374ZM15.37 12.124V12.874L15.3723 12.874L15.37 12.124ZM17.9326 13.1766L18.4614 12.6447V12.6447L17.9326 13.1766ZM18.25 15.7351C18.2511 16.1493 18.5879 16.4841 19.0021 16.483C19.4163 16.4819 19.7511 16.1451 19.75 15.7309L18.25 15.7351ZM8.60112 7.46922L4.47012 11.5932L5.52988 12.6548L9.66088 8.53078L8.60112 7.46922ZM4.48682 12.6709L8.61782 16.5469L9.64418 15.4531L5.51318 11.5771L4.48682 12.6709ZM5 12.874H15.37V11.374H5V12.874ZM15.3723 12.874C16.1333 12.8717 16.8641 13.1718 17.4038 13.7084L18.4614 12.6447C17.6395 11.8276 16.5267 11.3705 15.3677 11.374L15.3723 12.874ZM17.4038 13.7084C17.9435 14.245 18.2479 14.974 18.25 15.7351L19.75 15.7309C19.7468 14.572 19.2833 13.4618 18.4614 12.6447L17.4038 13.7084Z"
                            fill="#000000" />
                    </svg>
                    <span>Вернуться</span>
                </b-link>
                <b-button type="task" variant="success" class="mt-3">Добавить</b-button>
            </div>
            <div class="taskContainer pb-3">
                <h5 class="mt-3 text-start">Название</h5>
                <b-form-input required v-model="currentItem.text"></b-form-input>
                <h5 class="mt-3 text-start">Описание</h5>
                <b-form-textarea rows="3" v-model="currentItem.descr" no-resize></b-form-textarea>
                <input class="mt-2" type="file" accept="image/*" v-on:change="downloadImg" />
                <div class="mt-3">
                    <img :src="currentItem.img">
                </div>
            </div>
        </b-form>
    </b-container>
</template>

<script>
export default {
    name: 'TaskPage',
    data() {
        return {
            currentItem: { id: "0", text: "", descr: "", img: "" },
            itemId: null,
            taskList: [],
            file1: null,
            checkBox: null
        }
    },
    methods: {
        saveTask() {
            if (this.checkBox) this.currentItem.img = ""
            this.taskList = this.$store.state.list.map(x => {
                return this.currentItem.id == x.id ? this.currentItem : x;
            });
            this.$store.dispatch('editList', this.taskList)
            this.$router.push('/')
        },
        addTask() {
            this.taskList.push(this.currentItem)
            this.$store.dispatch('editList', this.taskList)
            this.$router.push('/')

        },
        downloadImg(e) {
            let reader = new FileReader
            reader.addEventListener('load', (res) => {
                this.currentItem.img = res.target.result
            })
            reader.readAsDataURL(e.target.files[0])
        }
    },
    created() {
        this.taskList = this.$store.state.list
        if (this.$route.query.id) {
            this.itemId = this.$route.query.id
            let id = this.itemId
            this.currentItem = this.$store.state.list.filter(function (itemm) {
                return itemm.id == id;
            })[0]
        }
        else {
            this.currentItem.id = this.taskList.length

        }

    }
}
</script>

<style>
.taskContainer {
    display: flex;
    flex-direction: column;
}

.taskContainer img {
    display: block;
    width: 100%;
}

.taskBody {
    display: flex;
    flex-direction: column;
}

.taskBody a {
    align-self: flex-start;
    margin-top: 15px;
    display: flex;
    gap: 5px;
    text-decoration: none;
    padding: 5px 0;
    border-radius: 0.375rem;
    color: black;
    cursor: pointer;
}
</style>