import { useState } from "react";
import { Button, Pressable, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native";
import { View } from "react-native";

export default function ViaCep() {
    // CEP
    // ENDEREÇO(DADOS)
    // ERROR
    // hook useState -> Pega o estado atual, modifica o estado.

    // --- ESTADOS DO COMPONENTE ---
    const [cepInput, setCepInput] = useState('');
    const [endereco, setEndereco] = useState(null);
    const [error, setError] = useState(null);

    const buscarCep = async () => {
        setEndereco(null)
        setError(null)

        try {
            const url = `https://viacep.com.br/${cepInput}/json/`
            const response = await fetch(url);
            const data = await response.json();

            if(data.erro) {
                setError('CEP não encontrado ou inválido!');
            } else {
                setEndereco(data);
            }

        } catch(error) {
            setError("Falha na rede. Verifique sua conexão ou tente mais tarde!")
        }
    }

    // --- INTERFACE UI ---
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Buscador de Endereço via CEP
            </Text>
            <TextInput 
                placeholder="Digite o CEP (apenas números)" 
                style={styles.input} 
                value={cepInput}  
                onChangeText={setCepInput}
                keyboardType="numeric"
                maxLength={8}
            />
            <Button 
                title="Buscar"
                onPress={buscarCep}
            />
        </View>
    )
}
// --- ESTILOS ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
        alignItems: "stretch",
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#fff",
        marginBottom: 20,
    }

})