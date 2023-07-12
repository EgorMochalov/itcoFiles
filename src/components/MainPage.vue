<template>
    <div class="modal" :style="showModal ? 'display:flex' : 'display:none'">
        <div class="modalContainer">
            <h3 class="modalTitle">Вы уверены, что хотите удалить слудющие проекты?</h3>
            <ul class="deliteList">
                <li v-for="item in selected" :key="item.id">{{ item.text }}</li>
            </ul>
            <div class="modalButtonContainer">
                <button v-on:click="deliteTasks" class="modalButton modalTrue">Да</button>
                <button v-on:click="showModal = false" class="modalButton modalFalse">Нет</button>
            </div>
        </div>
    </div>
    <b-container>
        <div class="buttonContainer mt-3 mb-3">
            <router-link to="/task" class="createButton">Создать</router-link>
            <b-button variant="danger" v-on:click="() => { if (selected.length > 0) showModal = true }">Удалить</b-button>
        </div>
        <b-list-group v-for="item in taskList" :key="item.id">
            <b-list-group-item class="mb-2 taskItem d-flex justify-content-between align-items-center">
                <b-link :to="'/task?id='+item.id">
                    <h3 class="m-0">{{ item.text }}</h3>
                </b-link>
                <b-form-checkbox :value="item" v-model="selected">
                </b-form-checkbox>
            </b-list-group-item>
        </b-list-group>
    </b-container>
</template>
<script>
export default {
    name: 'MainPage',
    data() {
        return {
            selected: [],
            taskList: [],
            showModal: false
        }
    },
    created() {
        this.taskList = this.$store.state.list
    },
    computed: {
        filterList() {
            let index = this.selected.map((item) => (item.id))
            return this.taskList.filter(function (itemm) {
                return !index.includes(itemm.id);
            })
        }
    },
    methods:{
        deliteTasks() {
            this.taskList = this.filterList;
            this.$store.dispatch('editList', this.taskList)
            this.showModal = false
            this.selected = []
        },
    }
}
</script>

<style>
.modal {
    background-color: rgba(220, 220, 220, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 10;
}

.modalContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;
    max-width: 353px;
    background-color: white;
    border-radius: 8px;
    padding: 36px;
}

.deliteList {
    padding: 0;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    list-style: none;
}

.modalButtonContainer {
    display: flex;
    gap: 36px;
}

.modalTitle {
    color: #000;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.modalButton {
    cursor: pointer;
    padding: 6px 36px;
    border-radius: 3px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border: none;
}

.modalTrue {
    background: #E0E0E0;
    color: #828282;
}

.modalFalse {
    background: rgb(16, 194, 16);
    color: white;
}

.taskItem a {
    text-align: start;
    flex: 1;
    cursor: pointer;
    text-decoration: none;
    color: black;
}

.buttonContainer {
    display: flex;
    justify-content: space-between;
}

.createButton {
    background-color: #343a40;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 0.375rem;
    border: 1px solid #dee2e6;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
}
</style>