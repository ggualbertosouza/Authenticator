import { LoadingState } from '@/store/loading/type';
import { create } from 'zustand';

const useLoadingStore = create<LoadingState>((set) => ({
    loading: false,
    setLoading: (state) => set({ loading: state })
}))

export default useLoadingStore;