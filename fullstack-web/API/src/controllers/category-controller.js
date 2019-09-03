'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/category-repository');

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

exports.getByDescription = async(req, res, next) => {
    try {
        if (req.params.description === '0') {
            var data = await repository.get();
            res.status(200).send(data);
        } else {
            var data = await repository.getByDescription(req.params);
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
    contract.hasMinLen(req.body.description, 5, 'A descrição deve conter pelo menos 5 caracteres');

    //Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            description: req.body.description
        });
        res.status(201).send({ 
                message: 'Categoria cadastrada com sucesso!'
            });
        } catch (e) {
            res.status(500).send({
                message: 'Falha ao processar sua requisição'
            });
        }
}

exports.put = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.description, 5, 'A descrição deve conter pelo menos 5 caracteres');

    //Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.update(req.body);
            res.status(200).send({
                    message: 'Categoria atualizada com sucesso!'
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
                message: 'Categoria removida com sucesso!'
            });
    } catch (e) { 
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};