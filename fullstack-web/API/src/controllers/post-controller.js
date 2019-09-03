'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/post-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByCategory = async(req, res, next) => {
    try {
        var data = await repository.getByCategory(req.body.Category);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByTitle = async(req, res, next) => {
    try {
        if (req.params.title === '0') {
            var data = await repository.get();
            res.status(200).send(data);
        } else {
            var data = await repository.getByTitle(req.params);
            res.status(200).send(data);
        }
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 5, 'O título deve conter pelo menos 5 caracteres');
    contract.hasMinLen(req.body.text, 1, 'O texto deve conter pelo menos 1 caractere');
    contract.hasMaxLen(req.body.text, 500, 'O texto deve conter até 500 caracteres');
    contract.isRequired(req.body.Category, 'A categoria é obrigatória');

    //Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {

        await repository.create({
            title: req.body.title,
            text: req.body.text,
            Category: req.body.Category
        });
        
        res.status(201).send({ 
                message: 'Post cadastrado com sucesso!'
            });
        } catch (e) {
            console.log(e);
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
}

exports.put = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 5, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.text, 1, 'O texto deve conter pelo menos 1 caractere');
    contract.hasMaxLen(req.body.text, 500, 'O texto deve conter até 500 caracteres');
    contract.isRequired(req.body.Category, 'A categoria é obrigatória');

    //Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    
    try {
        await repository.update(req.body);
            res.status(200).send({
                    message: 'Post atualizado com sucesso!'
                });
    } catch (e) { 
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.params.id);
            res.status(200).send({
                message: 'Post removido com sucesso!'
            });
    } catch (e) { 
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};